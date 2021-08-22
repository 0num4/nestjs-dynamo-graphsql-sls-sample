# nestjs + sls(aws lambda) + graphql + dynamodb + cdk + reactサンプル

* eslint固くした
* graphql入れた

## build & start

### playground
http://localhost:3002/graphql

## deploy

## 参考
nestjs + graphql
https://docs.nestjs.com/graphql/quick-start

公式のドキュメントだとgraphsql走らんし・・・(schemaが必要らしい)
https://qiita.com/Gma_Gama/items/90b98e046e1b66a71c22

### ┗sls+nest

いくつか実装見たけど結局本質的にはexpressをbootstrapで作ってExpressAdapterでmapしてlambda handler足してる感じ。
https://qiita.com/YutaSaito1991/items/b90440b01f6ead27ff22
https://dev.classmethod.jp/articles/nestj-aws-lambda-api-gateway/
https://nishabe.medium.com/nestjs-serverless-lambda-aws-in-shortest-steps-e914300faed5
https://medium.com/swlh/run-nestjs-application-in-serverless-framework-on-aws-a93a75b8b6c6

今回は採用してないけどnestjsをsamに乗せることも可能っぽい
やってるrepo:
https://github.com/rynop/abp-sam-nestjs

## swagger

http://localhost:3002/sample_api/

https://qiita.com/odanado/items/60456ab3388f834dc9ca