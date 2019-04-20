# create-koop-app

Experimental APIs to generate Koop applications and plugins.

This project is based on [@koopjs/cli](https://github.com/koopjs/koop-cli).

Try the live demo [https://create-koop-app.herokuapp.com/api/new/app/my-app](https://create-koop-app.herokuapp.com/api/new/app/my-app) for a live demo.

## API

For full details of the API parameter, see the [Koop CLI documentation](https://github.com/koopjs/koop-cli/blob/master/README.md).

### GET /api/new/:type/:name

Create a Koop project with the given type and name and download as a .zip file.

#### Parameters

* **type**: project type
* **name**: project name

#### Example

``` bash
# create an app project named "my-app" and download as project.zip
curl -o project.zip ttps://create-koop-app.herokuapp.com/api/new/app/my-app
```

### POST /api/new

Create a Koop project based on the input specification and download as a .zip file. A body (project specification) should be sent with the request.

#### Request Body

``` javascript
{
  // required, project type
  "type": "app",
  // required, project name
  "name": "my-app",
  // optional, project configuration
  "config": {},
  // optional, an array of Koop plugin type and name
  "plugins": [
    { "type": "provider", "name": "@koopjs/provider-github" }
  ]
}
```

#### Example

``` bash
# send a POST request with project specification and download as project.zip
curl -H "Content-Type: application/json" \\
  --request POST \\
  --data '{ "type": "app", "name": "my-app" }' \\
  -o project.zip \\
  https://create-koop-app.herokuapp.com/api/new
```

## Testing

Running the `npm run start:dev` command will start a test server at `http://localhost:3000`.
