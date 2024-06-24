package controllers

import (
	"bytes"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type ExternalServiceController struct{}

func NewExternalServiceController() *ExternalServiceController {
	return &ExternalServiceController{}
}

func (c *ExternalServiceController) PostExternalData(ctx *gin.Context) {
	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}

	externalURL, exists := os.LookupEnv("EXTERNAL_URL")

	if !exists {
		log.Print("No EXTERNAL_URL in .env file")
	}

	clientBody, err := ioutil.ReadAll(ctx.Request.Body)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Faild to read request body"})
		return
	}

	req, err := http.NewRequest("POST", externalURL+"/check", bytes.NewBuffer(clientBody))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
		return
	}

	req.Header.Set("Content-Type", "multipart/form-data")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request"})
		return
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read response"})
		return
	}

	ctx.Data(resp.StatusCode, "applications/json", body)
}
