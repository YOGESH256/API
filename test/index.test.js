const request = require('supertest')
const app = require('../index');
const express = require('express');
const Post = require("../models/Post");

const mongoose = require("mongoose");

jest.setTimeout(60000);


require("dotenv").config();








let token = ''


beforeAll(async () => {

  mongoose.connect(process.env.MONGO_URL, (err) => {
if(err) console.log(err)
else console.log("mongdb is connected");
});





})


afterAll(async () => {
  await mongoose.connection.close();
});





describe('PostsAPI' , () => {


  it('insert a user' , async() => {
    await request(app)
      .post('/api/auth/')
      .send({
        username: "Mishra",
        email: "Mishra123@gmail.com",
        password: "123456789"
      })
      .expect(200)
      .then(async (response) => {

        token = `Bearer ` + response.body
        console.log( response.body);


      })



  })
  it('POST request but the title field is there' ,async() => {


data = {
    title: 'New title',
    desc: 'dolor sit amet',
  }

    await request(app)
		.post('/api/posts/')
    .set('Authorization', token)
    .send(data)
    .expect(200)
    .then(async (response) => {
      console.log(response.body);
			// Check the response
			expect(response.body.postId).toBeTruthy()
			expect(response.body.title).toBe(data.title)
			expect(response.body.desc).toBe(data.desc)

			// Check the data in the database
			const post = await Post.findOne({ _id: response.body.postId })
			expect(post).toBeTruthy()
			expect(post.title).toBe(data.title)
			expect(post.desc).toBe(data.desc)


		})



})


it('POST request but title field is missing' ,async() => {


data = {
  desc: 'dolor sit amet',
}

  await request(app)
  .post('/api/posts/')
  .set('Authorization', token)
  .send(data)
  .expect(200)
  .then(async (response) => {
    console.log(response.body);
    // Check the response
    expect(response.body.postId).toBeTruthy()
    expect(response.body.title).toBe(data.title)
    expect(response.body.desc).toBe(data.desc)

    // Check the data in the database
    const post = await Post.findOne({ _id: response.body.postId })
    expect(post).toBeTruthy()
    expect(post.title).toBe(data.title)
    expect(post.desc).toBe(data.desc)


  })



})


})
