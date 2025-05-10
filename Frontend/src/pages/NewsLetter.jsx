import React, { useState } from 'react';
import newsLetter from '../assets/newsletter.png';
import axios from 'axios';

const NewsLetter = () => {

    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/send-email", {
                email,
            });

            setStatus(response.data.message);
            setEmail("");
        } catch (error) {
            console.error("Error sending email:", error);
            setStatus("Failed to send email.");
        }
    };


    return (
        <div class="bg-gray-100 py-6">
            <div class="md:grid md:grid-cols-2 max-w-4xl bg-white mx-4 md:mx-auto rounded-xl mt-4 mb-8 bg-grey-100">
                <img src={newsLetter}
                    alt="newsletter" class="hidden md:block w-full max-w-lg rounded-xl" />
                <div class="relative flex items-center justify-center">
                    {/* <button class="absolute top-6 right-6" aria-label="Close">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 2 2 13M2 2l11 11" stroke="#1F2937" stroke-opacity=".7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button> */}
                    <div class="max-md:py-20 px-6 md:px-10 text-center">
                        <h1 class="text-3xl font-bold">
                            Subscribe to our newsletter
                        </h1>
                        <p class="mt-4 text-gray-500">
                            Be the first to get the latest news about trends, promotions, and much more!
                        </p>
                        <form class="mt-8 flex" onSubmit={handleSubmit}>
                            <input type="email"
                                value={email}
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                class="w-full outline-none rounded-l-md border border-r-0 border-gray-300 p-4 text-gray-900" />
                            <button type="submit" class="rounded-r-md bg-blue-600 px-7 py-2 text-white hover:bg-red-200">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsLetter
