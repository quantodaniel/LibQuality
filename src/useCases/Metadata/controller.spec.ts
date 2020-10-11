import request from "supertest";
import app from "@src/app";

describe("Metadata", () => {
  it("should return error with inexistent repo", async () => {
    const response = await request(app).get(
      "/repos/octocat/inexistent-repo/metadata"
    );
    expect(response.status).toBe(400);
  });

  it("should return success with existing repo", async () => {
    const response = await request(app).get(
      "/repos/octocat/Hello-World/metadata"
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("owner");
    expect(response.body).toHaveProperty("repo");
  });
});
