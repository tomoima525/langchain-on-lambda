# Langchain on Lambda

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
