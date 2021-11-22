# nestjs + sls(aws lambda) + swagger + graphql + dynamodb + cdk + reactサンプル

[![CI](https://github.com/0num4/nestjs-dynamo-graphsql-sls-sample/actions/workflows/githubactions.yml/badge.svg)](https://github.com/0num4/nestjs-dynamo-graphsql-sls-sample/actions/workflows/githubactions.yml)

* eslint固くした
* graphql入れた
* swagger入れた
* slsが動くように
* reactが動くように
* reactとbackendが通信出来るようにした
* CIでbuildとlintとtestのチェックするように(backendもfrontも)


## build & start

### graphql

nestjsでgraphqlを開発する方法としては
* code first・・・model(typescript)でreq,resを定義する。
* schema first・・・\*.graphqlファイルを先に作る

の2つがある

http://localhost:3002/graphql

## code first

まず*.model.tsを書く
次にresolverを作ってそれをapp.moduleに適用させる。

参考:
https://kakkoyakakko2.hatenablog.com/entry/nestjs-graphql-code-first

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

### sls deploy

なにこれ
```
npm install -g serverless ＃動く
yarn global add serverless # 動かない
choco install serverless -y #陥りがちな禁句
```

choco install serverlessするとどうなるか
```
  Error: Command failed: C:\ProgramData\chocolatey\lib\serverless\tools\serverless.exe --version
  internal/modules/cjs/loader.js:1030
    throw err;
    ^

  Error: Cannot find module 'C:\Users\setup\work\newKeirinkan\keirinkan-server\--version'
      at Function.Module._resolveFilename (internal/modules/cjs/loader.js:1027:15)
      at Function._resolveFilename (pkg/prelude/bootstrap.js:1459:46)
      at Function.Module._load (internal/modules/cjs/loader.js:896:27)
      at Function.runMain (pkg/prelude/bootstrap.js:1488:12)
      at internal/main/run_main_module.js:17:47 {
    code: 'MODULE_NOT_FOUND',
    requireStack: []
  }
```

デプロイ
```
sls deploy --aws-profile prv-sls --stage dev
```

deployしたとき500エラーが出る場合devDependencyに入っている可能性がある
```
    Why: I fixed this error when in package.json I moved everything from devDependencies to dependencies.
    https://stackoverflow.com/a/52641534
    Detail: Runtime.ImportModuleError: Error: Cannot find module 'aws-serverless-express'
```

offlineで動くか試す
```
sls offline --stage dev
```

## swagger

http://localhost:3002/sample_api/

http://localhost:3002/sample_api-json
末尾にjsonつけるとjson吐き出してくれるのありがたい

https://qiita.com/odanado/items/60456ab3388f834dc9ca

## swagger→openapi generator

yamlだとapiTag周りでエラーが出るのでjsonを使うほうがいい

1. backend の yarn start
2. curl.exe http://localhost:3000/\_api-json -o swaggerprd.json
3. npx openapi-generator-cli generate -g typescript-axios -i swaggerprd.json -o src/generated-api --skip-validate-spec


## react
上のディレクトリと誤字しやすいのでプロジェクトやっぱ分けたほうがいいね。
あとnestの中にreact入れるのもあんまりよくないしreactの中にnest入れるのはそもそも出来ないし
この3観点からrepoは分けたほうがいいと思う

create-react-appはglobalのnode versionに依存する

```
nodist global 14.17.1
npx create-react-app create-react-sample --template typescript
```

```
cd create-react-sample
yarn build #ビルド
yarn start # スタート
```

frontとbackendの通信はaxiosを使っている。

取得した文字列などはuseEffectを使ってコンポーネント内でアップデートして表示する。

## deploy

```
aws s3 mb s3://nestjs-sls-dynamo-lambda-frontend --profile prv-sls
```

### ビルド

```
yarn build
```

`build/` 以下に出力される。

### S3 へのアップロード

要 aws-cli

まずはアップロード先バケットの中身を削除する。

```
aws s3 \
  --profile [profile] \
  rm s3://[bucket-name]/ --recursive
```

そして、 `build/` 以下をバケットにアップロードする。

```
aws s3 --profile xxxxx cp build s3://nestjs-sls-dynamo-lambda-frontend/ --recursive
```

## デプロイ先
http://nestjs-sls-dynamo-lambda-frontend.s3-website-ap-northeast-1.amazonaws.com/

# CDK

s3+cfパターンの構築にはこれが使えそう。
もちろんs3+cfを生cdkで書いてもいいけど

https://www.npmjs.com/package/cdk-spa-deploy

### corsの設定

serverless.ymlとかapi gatewayとかcfとかs3の設定ではなく、nestでできる。
`app.enableCors`

### github actions

jobは2つ以上追加出来ない。
jobの中のセクション(nestjsやreact)などで区切る。

cdはuses: actions/checkout@v2の後である必要がある(checkoutしないとそもそもsourceがない。)


### crlf絶対許さないマン

vscodeが赤線出しまくるのでcrlfは許さないということにしてすべてlfで統一するようにした
* vscodeの設定(下記の設定を保存するとプロジェクトのフォルダーに.vscode/setting.jsonが作られる)
![image](https://user-images.githubusercontent.com/49909750/134957546-657aab0b-6309-4c43-a820-37a6120cc86a.png)

* gitの設定
```
  git config core.autocrlf input
  git config --local core.autocrlf input
  git config --global core.autocrlf input
  git config --system core.autocrlf input
```

* editorconfig

```
# 改行コード指定: LF
end_of_line = lf
```

* prettier
eslint fixするときに有効になる？はず

```
{
  "singleQuote": true,
  "endOfLine": "lf",
  "trailingComma": "all"
}
```

eslintの設定もどこかにありそう


### create-react-sampleデザインについて
下記はラフ

コードとスケールの勉強をするアプリ

* ログイン画面でユーザーがログインできる

* 表示されているコードがなんのスケールか、なんの進行か問題を出す

* pianoを引いてる動画やSynthesiaの動画を表示してなんのスケールか問題を出す

* サビの曲を聴いてなんの進行か問題を出す

* BPMを当てる

```
三和音ちゃんbot
GAC
このコードは何かな？
```

* 成績機能