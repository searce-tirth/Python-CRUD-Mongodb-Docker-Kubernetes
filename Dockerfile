# Use the official Python image as the base image
FROM python:3.8-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt file to the working directory
COPY requirements.txt .

# Install required packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Flask application files to the working directory
COPY . .

# Expose the port the Flask app will listen on
EXPOSE 80

RUN pip install "pymongo[srv]""

# Command to run the Flask application
CMD ["python", "main.py"]
