import request from "request" ;
import {expect}  from ("chai");


const url = "http://localhost:3001"
const option = {
  method: "POST",
  url: url+ "/imageThumb",
  headers: {
    "content-type": "application/json"
  }
};
let token;

before(done => {
  request(
    {
      ...option,
      url: url + "/login",
      body: JSON.stringify({ username: "username", password: "password" })
    },
    (err, res, body) => {
      token = "bearer " + res.headers["x-auth-token"];
    }
  );
  done();
});

describe("Generate Thumbnail", () => {
  it("should reject unauthorized user to access this endpoint and setting status code to 401", done => {
    request(
      {
        ...option,
        body: JSON.stringify({ url: "image URl" })
      },
      (err, res, body) => {
        expect(res.statusCode).to.equal(401);
        done();
      }
    );
  });
  it("should reject non validurl and set resposnse status code to be 400", done => {
    request(
      {
        ...option,
        headers: {
          "content-type": "application/json",
          authorization: token
        },
        body: JSON.stringify({ url: "wrong url" })
      },
      (err, res, body) => {
        const { message } = JSON.parse(res.body);
        expect(res.statusCode).to.equal(400);
        expect(message).to.include("This link is broken or does not exist");
        done();
      }
    );
  });

  it("should return bad request status code if the link provided is a broken link ", done => {
    request(
      {
        ...option,
        headers: {
          "content-type": "application/json",
          authorization: token
        },
        body: JSON.stringify({
          url: "https://this-is-a-broken-link.com/brokenxcxcxc"
        })
      },
      (err, res, body) => {
        const { message } = JSON.parse(res.body);
        expect(res.statusCode).to.equal(400);
        expect(message).to.include("This link is broken or does not exist");
        done();
      }
    );
  });

  it("should return status code 200", done => {
    request(
      {
        ...option,
        headers: {
          "content-type": "application/json",
          authorization: token
        },
        body: JSON.stringify({
          url: "https://www.w3schools.com/w3css/img_snowtops.jpg"
        })
      },
      (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      }
    );
  });
});