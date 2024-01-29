const fs = require('fs');

// Extract command-line arguments
const args = process.argv.slice(2);

// Check if the required arguments are provided
if (args.length !== 1 && args.length !== 2) {
  console.error('Usage: node countStats.js [-c|-l|-w|-b] [file]');
  process.exit(1);
}

// Extract option and file path from command-line arguments
const option = args.length === 2 && args[0][0] === '-' ? args[0] : null;
const filePath = args.length === 2 ? args[1] : args[0];

// Function to count lines, characters, words, and bytes in a file
const wc = (filePath, options) => {
  try {
    // Check if the file path is provided
    if (!filePath) {
      console.error('File path is not provided.');
      process.exit(1);
    }

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      process.exit(1);
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Count characters, lines, and words
    const characters = fileContent.length;
    const lines = fileContent.split('\n').length;
    const words = fileContent.split(/\s+/).filter(word => word.length > 0).length;

    // Print the results based on the provided options or default options
    const selectedOptions = options || ['-c', '-l', '-w'];
    selectedOptions.forEach(opt => {
      switch (opt) {
        case '-c':
          console.log(`Characters: ${characters}`);
          break;
        case '-l':
          console.log(`Lines: ${lines}`);
          break;
        case '-w':
          console.log(`Words: ${words}`);
          break;
        default:
          console.error(`Invalid option: ${opt}. Use -c, -l, -w.`);
          break;
      }
    });
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
};

// Perform the counting operation based on the provided options or default options
wc(filePath, option ? [option] : null);
