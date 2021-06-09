# My Books

This sample shows you how to develop a polyglot application with Okteto

[![Develop on Okteto](https://okteto.com/develop-okteto.svg)](https://cloud.okteto.com/deploy)

## Login to Okteto

```
okteto login
```

```
okteto namespace
```

## Set your username

```
export OKTETO_USERNAME=$(okteto config view username)  
```

## Get a book's info
```
curl https://books-$OKTETO_USERNAME.cloud.okteto.net/0140258833
```

## Add your rating

```
curl -d '{"rating":"5"}' https://books-$OKTETO_USERNAME.cloud.okteto.net/0140258833
```

> This is based on Istio's [bookinfo demo](https://github.com/istio/istio/blob/master/samples/bookinfo/)
