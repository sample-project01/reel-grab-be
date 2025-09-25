import aesjs from "aes-js"; // or use import in ESM environment
const key = aesjs.utils.utf8.toBytes("qwertyuioplkjhgf"); // 16 bytes key
function encryptString(plainText) {
    // Convert text to bytes
    const textBytes = aesjs.utils.utf8.toBytes(plainText);
    // Apply PKCS#7 padding
    const paddedBytes = aesjs.padding.pkcs7.pad(textBytes);
    // Create AES ECB mode instance
    const aesEcb = new aesjs.ModeOfOperation.ecb(key);
    // Encrypt
    const encryptedBytes = aesEcb.encrypt(paddedBytes);
    // Convert encrypted bytes to hex string
    return aesjs.utils.hex.fromBytes(encryptedBytes);
}
function decryptString(encryptedHex) {
    // Convert hex string to bytes
    const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
    // Create AES ECB mode instance
    const aesEcb = new aesjs.ModeOfOperation.ecb(key);
    // Decrypt
    const decryptedPaddedBytes = aesEcb.decrypt(encryptedBytes);
    // Remove PKCS#7 padding
    const decryptedBytes = aesjs.padding.pkcs7.strip(decryptedPaddedBytes);
    // Convert bytes to text
    return aesjs.utils.utf8.fromBytes(decryptedBytes);
}
// Example usage:
// const originalText = "https://www.instagram.com/reels/DO-mthMjCcl/";
// const encrypted = encryptString(originalText);
// console.log("Encrypted:", encrypted);
// const decrypted = decryptString(encrypted);
// console.log("Decrypted:", decrypted);
export default encryptString;
//# sourceMappingURL=utils.js.map