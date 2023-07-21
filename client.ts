import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/service";

const PORT = 8000;
const PROTO_FILE = "./proto/service.proto";

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));

const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;

const client = new grpcObj.serviceTest.requestResponse(
  `0.0.0.0:${PORT}`,
  grpc.credentials.createInsecure()
);

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
client.waitForReady(deadline, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  onClientReady();
});

function onClientReady() {
  //   client.request({ message: "Resquest from the client." }, (err, result) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     console.log(result?.message);
  //   });
  //   const stream = client.RandomNumbers({ maxVal: 90 });
  //   stream.on('data',(chunk)=>{
  //     console.log(chunk);
  //   })
  // stream.on('end',()=>{
  //   console.log(`Communication ended....`);
  // })
  const stream = client.todoList((err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(result);
  });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.write({ todo: "walking with hussain", status: "always" });
  stream.end();
}
