package utils

import (
	"crypto/rand"
	"encoding/base64"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GenerateCSRFToken() (string, error) {
	token := make([]byte, 32)
	_, err := rand.Read(token)
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(token), nil
}

func CSRFMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Generate CSRF token and set it in the response header
		token, err := GenerateCSRFToken()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate CSRF token"})
			c.Abort()
			return
		}
		c.Writer.Header().Set("X-CSRF-Token", token)

		// Verify CSRF token for non-GET, non-HEAD, non-OPTIONS requests
		if c.Request.Method != http.MethodGet && c.Request.Method != http.MethodHead && c.Request.Method != http.MethodOptions {
			clientToken := c.GetHeader("X-CSRF-Token")
			if clientToken == "" || clientToken != token {
				c.JSON(http.StatusForbidden, gin.H{"error": "Invalid CSRF token"})
				c.Abort()
				return
			}
		}

		c.Next()
	}
}
