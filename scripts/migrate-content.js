const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, '../AI时代汝瓷英语.md');
const outputDir = path.join(__dirname, '../content/chapters');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const content = fs.readFileSync(sourceFile, 'utf8');

// Split by Unit headers. 
// The regex looks for lines starting with "# Unit" (allowing for potential BOM or whitespace)
const units = content.split(/\n(?=# Unit )/);

console.log(`Found ${units.length} potential units.`);

units.forEach((unitContent, index) => {
    // Skip if it's just preamble before the first unit
    if (!unitContent.trim().startsWith('# Unit')) {
        return;
    }

    const lines = unitContent.split('\n');
    const titleLine = lines.find(line => line.startsWith('# Unit'));

    if (!titleLine) return;

    // Parse title: "# Unit 1: Introduction to Ru Ware" -> "Introduction to Ru Ware"
    const titleMatch = titleLine.match(/# Unit \d+: (.+)/);
    const title = titleMatch ? titleMatch[1].trim() : 'Unknown Unit';

    // Extract Unit Number
    const unitNumberMatch = titleLine.match(/# Unit (\d+):/);
    const unitNumber = unitNumberMatch ? parseInt(unitNumberMatch[1]) : index + 1;

    // Generate slug
    const slug = `unit-${unitNumber}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    // Extract description (first paragraph after title or Learning Objectives)
    // Simple heuristic: look for "Learning Objectives" and take the text after it, 
    // or just use a generic description.
    let description = `Learn about ${title}`;

    // Construct Frontmatter
    const frontmatter = [
        '---',
        `chapter: ${unitNumber}`,
        `title: ${title}`,
        `titleCN: ${title} (CN)`, // Placeholder, could try to find Chinese title if available
        `description: ${description}`,
        `level: 初级`,
        `duration: 6-8 hours`,
        `lessons: 10`,
        `color: from-cyan-500 to-blue-500`, // Default color
        `icon: 🏺`,
        '---',
        ''
    ].join('\n');

    // Remove the original title line from content to avoid duplication if desired, 
    // but keeping it is usually fine. 
    // However, the design might expect h1 to be handled by the layout. 
    // Let's keep the content as is, just prepended with frontmatter.
    // Actually, standard markdown content usually starts after frontmatter.
    // The original file has "# Unit X: ...". We might want to remove that line 
    // if the page template adds the title. 
    // For now, I'll keep it to be safe, or maybe downgrade it to h2 if needed.
    // But let's just write the full content chunk.

    const fileContent = frontmatter + unitContent.trim();

    const outputPath = path.join(outputDir, `${slug}.md`);
    fs.writeFileSync(outputPath, fileContent);
    console.log(`Generated: ${slug}.md`);
});

console.log('Migration complete.');
