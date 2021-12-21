package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

func pong(c *fiber.Ctx) error {
	return c.Status(200).SendString("ok")
}

func uploadFile(c *fiber.Ctx) error {
	file, err := c.FormFile("file")

	if err != nil {
		log.Println("image upload error --> ", err)
		return c.JSON(fiber.Map{
			"status":  500,
			"message": "Server error",
			"data":    nil,
		})
	}

	// generate uploadFile from filename and extension
	uploadFile := file.Filename

	// save image to ./images dir
	err = c.SaveFile(file, fmt.Sprintf("./files/%s", uploadFile))

	if err != nil {
		log.Println("image save error --> ", err)
		return c.JSON(fiber.Map{
			"status":  500,
			"message": "Server error",
			"data":    nil,
		})
	}

	// generate image url to serve to client using CDN

	imageUrl := fmt.Sprintf("http://localhost:4000/images/%s", uploadFile)

	// create meta data and send to client

	data := map[string]interface{}{

		"imageName": uploadFile,
		"imageUrl":  imageUrl,
		"header":    file.Header,
		"size":      file.Size,
	}

	return c.JSON(fiber.Map{
		"status":  201,
		"message": "Image uploaded successfully",
		"data":    data,
	})
}

func setupRoutes(app *fiber.App) {
	app.Get("/api", pong)
	app.Post("/upload", uploadFile)
}

func NewServer() *fiber.App {
	app := fiber.New()
	app.Static("/", "./frontend.ts/build/")
	setupRoutes(app)

	return app
}

func main() {
	app := NewServer()
	app.Listen(":3000")
}
