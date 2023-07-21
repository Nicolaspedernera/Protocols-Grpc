import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { requestResponseClient as _serviceTest_requestResponseClient, requestResponseDefinition as _serviceTest_requestResponseDefinition } from './serviceTest/requestResponse';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  serviceTest: {
    chat: MessageTypeDefinition
    chatResponse: MessageTypeDefinition
    numberRequest: MessageTypeDefinition
    numberResponse: MessageTypeDefinition
    requestResponse: SubtypeConstructor<typeof grpc.Client, _serviceTest_requestResponseClient> & { service: _serviceTest_requestResponseDefinition }
    serverResponse: MessageTypeDefinition
    todoRequest: MessageTypeDefinition
    todoResponse: MessageTypeDefinition
    userRequest: MessageTypeDefinition
  }
}

