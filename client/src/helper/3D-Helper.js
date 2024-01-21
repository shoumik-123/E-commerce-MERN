export async function extractKeyValuePairs(description, subcategory) {
    const regex = /(\w+)=(\w+)/g;
    const matches = description.match(regex);
    const result = { subcategory };

    if (matches) {
        matches.forEach((match) => {
            const [key, value] = match.split('=');
            result[key.trim()] = value.trim();
        });
    }

    return result;
}