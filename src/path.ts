import { resolve } from "node:path";
import { register } from "tsconfig-paths";

const baseUrl = resolve(__dirname, "..");
register({
	baseUrl,
	paths: {
		"@app/*": ["src/app/*"],
		"@generated/*": ["generated/*"],
		"@shared/*": ["shared/*"],
		"@helpers/*": ["helpers/*"],
	},
});
