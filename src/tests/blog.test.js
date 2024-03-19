const supertest = require('supertest');
const app = require('../server');
const Blog = require('../model/blogschema');

// Mock the blogschema.js module
jest.mock("../model/blogschema.js");

describe('Test createBlog method', () => {

  


    test("Create Blog - Success", async () => {
        const requestData = {
            title: "Test Blog",
            content: "Test content",
            tags: ["test", "blog"]
        };
    
        // Mock response from the Blog.create method
        const mockBlogData = {
            _id: "mockedBlogId",
            title: requestData.title,
            content: requestData.content,
            tags: requestData.tags,
            author: "mockedUserId",
            comments: [],
            likes: []
        };
        Blog.create.mockResolvedValue(mockBlogData);
    
        // Make the request using supertest
        const response = await request(app)
            .post('/create')
            .send({
                url:'http://localhost:3005'
            });
    
        // Expectations
        expect(response.statusCode).toBe(200); // Correct status code for success
        expect(response.body.status).toBe('success'); // Check for 'success'
        expect(response.body.data).toEqual(mockBlogData);
    });
    
    test("Create Blog - Failure", async () => {
        const requestData = {
            title: "Test Blog",
            content: "Test content",
            tags: ["test", "blog"]
        };
    
        // Mock error thrown by the Blog.create method
        const mockError = new Error("Mocked error");
        Blog.create.mockRejectedValue(mockError);
    
        // Make the request using supertest
        const response = await supertest(app)
            .post('/create')
            .send({
                url:'http://localhost:3005'
            });
    
        // Expectations
        expect(response.statusCode).toBe(400); // Correct status code for failure
        expect(response.body.status).toBe('error'); // Check for 'error'
        expect(response.body.message).toBe(mockError.message);
    });
})    