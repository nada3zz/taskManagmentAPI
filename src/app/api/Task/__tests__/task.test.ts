import request from "supertest";
import { app } from "../../../../app";
import prisma from "../../../../utils/prisma";

describe("Task Management", () => {
  let token: string;
  let taskId: number;

  const setAuthHeader = (req: any) =>
    req.set("Authorization", `Bearer ${token}`);

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({ username: "testUser", password: "Password@123" });
    token = res.body.data.accessToken;
  });

  it("should create a task", async () => {
    const response = await setAuthHeader(request(app).post("/api/tasks")).send({
      title: "Test Task",
      description: "Test Task Description",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "data",
      "Task has been added successfully"
    );

    const createdTaskResponse = await setAuthHeader(
      request(app).get("/api/tasks")
    );
    taskId = createdTaskResponse.body.data.tasks[0].id;
  });

  it("should fetch all tasks for the authenticated user", async () => {
    const response = await setAuthHeader(request(app).get("/api/tasks"));

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("tasks");
    expect(response.body.data.tasks).toBeInstanceOf(Array);
  });

  it("should fetch a single task by ID", async () => {
    const response = await setAuthHeader(
      request(app).get(`/api/tasks/${taskId}`)
    );
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("id", taskId);
    expect(response.body.data).toHaveProperty("title", "Test Task");
    expect(response.body.data).toHaveProperty(
      "description",
      "Test Task Description"
    );
    expect(response.body.data).toHaveProperty("userId");
  });

  it("should update an existing task", async () => {
    const response = await setAuthHeader(
      request(app).put(`/api/tasks/${taskId}`)
    ).send({
      title: "Updated Test Task",
      description: "Updated Task Description",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "data",
      "Task has been updated successfully"
    );

    const updatedTaskResponse = await setAuthHeader(
      request(app).get(`/api/tasks/${taskId}`)
    );

    expect(updatedTaskResponse.body.data).toHaveProperty(
      "title",
      "Updated Test Task"
    );
    expect(updatedTaskResponse.body.data).toHaveProperty(
      "description",
      "Updated Task Description"
    );
  });

  it("should delete an existing task", async () => {
    const response = await setAuthHeader(
      request(app).delete(`/api/tasks/${taskId}`)
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "data",
      "Task has been deleted successfully"
    );

    const fetchResponse = await setAuthHeader(
      request(app).get(`/api/tasks/${taskId}`)
    );
    expect(fetchResponse.status).toBe(400);
    expect(fetchResponse.body.tasks).toBeFalsy();
  });
});
