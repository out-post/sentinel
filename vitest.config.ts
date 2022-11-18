import { defineConfig } from "vitest/config";

defineConfig({
	test: {
		coverage: {
			provider: "istanbul",
		},
	},
});
