import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
    e2e: {
        specPattern: "cypress/e2e/**/*.{js,ts,feature}",
        // to override baseUrl in command line use: CYPRESS_baseUrl=[your baseUrl] npm run cypress:open
        baseUrl: "https://rahulshettyacademy.com",
        // mochawesome-reporter stuff
        // reporter: "cypress-mochawesome-reporter",
        // reporterOptions: {
        //     reportDir: "reports/mochawesome",
        //     charts: true,
        //     reportPageTitle: "Cypress Automation Practice",
        //     embeddedScreenshots: true,
        // },
        async setupNodeEvents(on, config) {
            await addCucumberPreprocessorPlugin(on, config);
            // implement node event listeners here
            on("task", {
                log(message) {
                    console.log(message);
                    return null;
                },
                table(message) {
                    console.table(message);
                    return null;
                },
            });
            on(
                "file:preprocessor",
                createBundler({
                    plugins: [createEsbuildPlugin(config)],
                })
            );
            // Make sure to return the config object as it might have been modified by the plugin.
            return config;
        },
    },
});
