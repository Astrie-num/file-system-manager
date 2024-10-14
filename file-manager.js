const {writeFile, readFile, appendFile, readdir, unlink} = require('fs').promises;

async function fileManager(){
    try{

        const firstFilePath = './content/test.txt';
        const secondFilePath = './content/quiz.txt';
        const firstContent = 'Hello, world!';
        const secondContent = 'Hey, Astrie';
        const appendedContent = '\nThis is an appended line.';
        const directoryPath = './content';

        let output = ' ';

        // Check if file exists before doing any other operations
        async function fileExists(filePath){
            try{
                await readFile(filePath)
                return true;
            }
            catch(err){
                if(err.code === "ENOENT"){
                    return false;
                }
                throw err;
            }
        }

        //Create first file
        await writeFile(firstFilePath, firstContent);
        output += "First file created successfully!<br>";

        // Create second file
        await writeFile(secondFilePath, secondContent);
        output += "Second file created successfully!<br>";

        // Read first file 
        if(await fileExists(firstFilePath)){

            const firstResult = await readFile(firstFilePath, 'utf-8');
            output += `Contents of the first file: ${firstResult}<br>`;
        }
        else{
            output += "First file does not exist<br>";
        }
        

        // Read second file
        if(await fileExists(secondFilePath)) {

            const secondResult = await readFile(secondFilePath, 'utf-8');
        output += `Contents of the second file ${secondResult}<br>`;

        }
        else{
            output += "Second file does not exist<br>";
        }
        
        
        // Append to first file 
        if(await fileExists(firstFilePath)){
            await appendFile(firstFilePath, appendedContent);
            output += "File appended successfully!<br>";

            //Read append results
            const updatedFirstResult = await readFile(firstFilePath, 'utf-8');
            output += `This is the result of appending: ${updatedFirstResult}<br>`;

        }
        else{
            output += "Cannot append to a non-existent file";
        }
        
        
        // List all files
        const files = await readdir(directoryPath);
        output += `All files present: ${files}<br>`;


        // Delete a file
        if(await fileExists(firstFilePath)){

            await unlink(firstFilePath);
            output += "File deleted successfully!<br>";
        }
        else{
            output += "Cannot delete a non-existent file";
        }
    

        // List files again
        const filesRemaining = await readdir(directoryPath);
        output += `Files present after deleting: ${filesRemaining}<br>`;

        return output;

    }
    catch(err){
        console.error(err);
        return "An error occurred while processing the files.<br>";
    }
}


module.exports = fileManager;