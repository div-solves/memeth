const solc = require('solc');
const fs = require('fs');
const path = require('path');

function findImports(importPath) {
  try {
    const fullPath = path.resolve(__dirname, 'node_modules', importPath);
    return {
      contents: fs.readFileSync(fullPath, 'utf8')
    };
  } catch (e) {
    return { error: 'File not found: ' + importPath };
  }
}

// Read contract
const source = fs.readFileSync('contracts/MemethPlatform.sol', 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'contracts/MemethPlatform.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode', 'evm.deployedBytecode', 'metadata']
      }
    },
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};

console.log('Compiling contract...');
const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

if (output.errors) {
  const hasErrors = output.errors.some(e => e.severity === 'error');
  output.errors.forEach(err => {
    if (err.severity === 'error' || err.severity === 'warning') {
      console.error(err.formattedMessage);
    }
  });
  if (hasErrors) {
    process.exit(1);
  }
}

// Create artifacts directory
const artifactsDir = path.join(__dirname, 'artifacts', 'contracts');
if (!fs.existsSync(artifactsDir)) {
  fs.mkdirSync(artifactsDir, { recursive: true });
}

// Save artifacts
const contractName = 'MemethPlatform';
const contractOutput = output.contracts['contracts/MemethPlatform.sol'][contractName];

const artifact = {
  _format: 'hh-sol-artifact-1',
  contractName: contractName,
  sourceName: 'contracts/MemethPlatform.sol',
  abi: contractOutput.abi,
  bytecode: '0x' + contractOutput.evm.bytecode.object,
  deployedBytecode: '0x' + contractOutput.evm.deployedBytecode.object,
  linkReferences: contractOutput.evm.bytecode.linkReferences || {},
  deployedLinkReferences: contractOutput.evm.deployedBytecode.linkReferences || {}
};

fs.writeFileSync(
  path.join(artifactsDir, `${contractName}.json`),
  JSON.stringify(artifact, null, 2)
);

console.log('✓ Compilation successful!');
console.log(`✓ Artifacts saved to artifacts/contracts/${contractName}.json`);
