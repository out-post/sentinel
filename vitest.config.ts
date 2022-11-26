import { defineConfig } from "vitest/config";

// eslint-disable-next-line
export default defineConfig({
	test: {
		coverage: {
			provider: "istanbul",
			reporter: ["json-summary", "json", "clover", "html", "lcov", "cobertura"],
		},
	},
});
