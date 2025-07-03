import fs from "node:fs";
import path from "node:path";

const moduleName = process.argv[2];

if (!moduleName) {
  console.error("Please provide a module name.");
  process.exit(1);
}

// Helper: PascalCase
const toPascalCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// Plural folder and files
const pluralModuleName = moduleName.endsWith("s") ? moduleName.toLowerCase() : moduleName.toLowerCase() + "s";
const ModuleName = toPascalCase(pluralModuleName);

// Prisma model name (singular)
const prismaModelName = pluralModuleName.endsWith("s") ? pluralModuleName.slice(0, -1) : pluralModuleName;

const baseDir = path.join(__dirname, "src", "app", "modules");
const modulePath = path.join(baseDir, pluralModuleName);

if (fs.existsSync(modulePath)) {
  console.error(`Module '${pluralModuleName}' already exists.`);
  process.exit(1);
}

try {
  fs.mkdirSync(modulePath, { recursive: true });

  const files: Record<string, string> = {
    [`${pluralModuleName}.controllers.ts`]: `import catchAsync from "@shared/catchAsync";

const get${ModuleName} = catchAsync(async (req, res) => {
  console.log(req, res);
});
const create${ModuleName} = catchAsync(async (req, res) => {
  console.log(req, res);
});
const update${ModuleName} = catchAsync(async (req, res) => {
  console.log(req, res);
});
const delete${ModuleName} = catchAsync(async (req, res) => {
  console.log(req, res);
});

export const ${ModuleName}Controllers = {
  get${ModuleName},
  create${ModuleName},
  update${ModuleName},
  delete${ModuleName},
};
`,

    [`${pluralModuleName}.services.ts`]: `import prisma from "@shared/prisma";

const get${ModuleName}FromDB = async () => {
  return await prisma.${prismaModelName}.findMany();
};

const create${ModuleName}IntoDB = async () => {
  // Example: return await prisma.${prismaModelName}.create({ data: {...} });
};

const update${ModuleName}IntoDB = async () => {
  // Example: return await prisma.${prismaModelName}.update({ where: {...}, data: {...} });
};

const delete${ModuleName}FromDB = async () => {
  // Example: return await prisma.${prismaModelName}.delete({ where: {...} });
};

export const ${ModuleName}Services = {
  get${ModuleName}FromDB,
  create${ModuleName}IntoDB,
  update${ModuleName}IntoDB,
  delete${ModuleName}FromDB,
};
`,

    [`${pluralModuleName}.routes.ts`]: `import createRouter from "@shared/createRouter";

const router = createRouter();

router.get("/");
router.post("/create");
router.patch("/update");
router.delete("/delete");

export const ${ModuleName}Routes = router;
`,
  };

  for (const fileName in files) {
    const filePath = path.join(modulePath, fileName);
    fs.writeFileSync(filePath, files[fileName]);
    console.log(`Created file: ${filePath}`);
  }

  console.log(`Module '${pluralModuleName}' generated successfully in src/app/modules.`);
} catch (error) {
  console.error("Error generating module:", error);
  process.exit(1);
}
