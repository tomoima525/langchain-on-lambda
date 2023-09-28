# Langchain on Lambda

- Remember a user and keep the context on DynamoDB
<img width="1161" alt="image" src="https://github.com/tomoima525/langchain-on-lambda/assets/6277118/cdf7acdf-f172-4645-9dba-0b6b09bdff76">

<img width="975" alt="image" src="https://github.com/tomoima525/langchain-on-lambda/assets/6277118/01f1f227-01a3-4057-bba1-0028aca707f9">


## Deployment

- Setup .env file
- Create table

```
pnpm cdk -a 'pnpm ts-node --prefer-ts-exts bin/db.ts' deploy --outputs-file bin/db.json --profile={profile}
```

- Deploy

```
pnpm cdk deploy --profile={profile}
```
