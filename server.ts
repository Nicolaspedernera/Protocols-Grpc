import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/service";
import { requestResponseHandlers } from "./proto/serviceTest/requestResponse";
import { todoResponse } from "./proto/serviceTest/todoResponse";
import { todoRequest } from "./proto/serviceTest/todoRequest";

const PORT = 8000;
const PROTO_FILE = "./proto/service.proto";

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));

const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;

const serviceTest = grpcObj.serviceTest;

function main() {
  const server = getServer();

  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Your server as started on port ${PORT}`);
      server.start();
    }
  );
}

const todoList: todoResponse = { todos: [] };

function getServer() {
  const server = new grpc.Server();
  server.addService(serviceTest.requestResponse.service, {
    request: (req, res) => {
      console.log(req.request);
      res(null, { message: `Response` });
    },

    RandomNumbers: (call) => {
      const { maxVal = 10 } = call.request;
      console.log(maxVal);

      let runCount = maxVal;
      const id = setInterval(() => {
        runCount = ++runCount;
        call.write({ num: Math.floor(Math.random() * maxVal) });
        if (runCount <= 0) {
          clearInterval(id);
          call.end();
        }
      }, 1000);
    },
    todoList: (call, callback) => {
      call.on("data", (chunk: todoRequest) => {
        todoList.todos?.push(chunk);
        console.log(chunk);
      });

      call.on("end", () => {
        callback(null, { todos: todoList.todos });
      });
    },
  
  } as requestResponseHandlers);

  return server;
}

main();
