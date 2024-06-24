package commands

import (
	"github.com/tools/internal/utils"
	"github.com/spf13/cobra"
)

var uploadDataCmd *cobra.Command = &cobra.Command{
	Use: "data upload",
	Short: "Загружает данные которые пользователь предоставляет для базы",
	Run: uploadData,
}

func uploadData(cmd *cobra.Command, args []string) {
	utils.UploadDataFromFolderToDB()
}

func init() {
	rootCmd.AddCommand(uploadDataCmd)
}