package commands

import "github.com/spf13/cobra"


var rootCmd *cobra.Command = &cobra.Command{

}

func Start() {
	if err := rootCmd.Execute(); err != nil {
		panic(err.Error())
	}
}