pb2TSApi ./rpc_proto/$1.proto \
  -i ./common_proto \
  -i ./rpc_proto \
  --protoOptionTagHttpMethod '(http_ext.http_rule).method' \
  --protoOptionTagHttpPath '(http_ext.http_rule).path'