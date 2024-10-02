import request from "supertest";
import { app } from "../../../../app";

describe("User Authentication", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/api/users/register").send({
      username: "testuser",
      password: "Password@123",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("accessToken");
  });

  it("should login a user", async () => {
    const response = await request(app).post("/api/users/login").send({
      username: "testuser",
      password: "Password@123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("accessToken");
  });
});
