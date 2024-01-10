const fs = require('fs');

// Extract command-line arguments
const args = process.argv.slice(2);

// Check if the required arguments are provided
if (args.length !== 2 || !['-c', '-l', '-w', '-b'].includes(args[0])) {
  console.error('Usage: node countStats.js -c|-l|-w|-b [file]');
  process.exit(1);
}

// Extract option and file path from command-line arguments
const option = args[0];
const filePath = args[1];

// Function to count lines, characters, words, and bytes in a file
const wc = (filePath, option) => {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    switch (option) {
      case '-c':
        const characters = fileContent.length;
        console.log(`Characters: ${characters}`);
        break;
      case '-l':
        const lines = fileContent.split('\n').length;
        console.log(`Lines: ${lines}`);
        break;
      case '-w':
        const words = fileContent.split(/\s+/).filter(word => word.length > 0).length;
        console.log(`Words: ${words}`);
        break;
      case '-b':
        const bytes = Buffer.from(fileContent, 'utf-8').length;
        console.log(`Bytes: ${bytes}`);
        break;
      default:
        console.error('Invalid option. Use -c|-l|-w|-b.');
        break;
    }
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
}

// Count the specified stats in the file
wc(filePath, option);
