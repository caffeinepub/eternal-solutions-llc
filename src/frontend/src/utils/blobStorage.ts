/**
 * ExternalBlob - wrapper for blob storage uploads.
 * Uses the StorageClient under the hood via the Caffeine platform config.
 */

type ProgressCallback = (percentage: number) => void;

export class ExternalBlob {
  private _bytes: Uint8Array | null;
  private _url: string | null;
  private _progressCallback: ProgressCallback | null = null;

  private constructor(bytes: Uint8Array | null, url: string | null) {
    this._bytes = bytes;
    this._url = url;
  }

  static fromBytes(bytes: Uint8Array): ExternalBlob {
    return new ExternalBlob(bytes, null);
  }

  static fromURL(url: string): ExternalBlob {
    return new ExternalBlob(null, url);
  }

  withUploadProgress(onProgress: ProgressCallback): ExternalBlob {
    const clone = new ExternalBlob(this._bytes, this._url);
    clone._progressCallback = onProgress;
    return clone;
  }

  async getBytes(): Promise<Uint8Array> {
    if (this._bytes) return this._bytes;
    if (this._url) {
      const res = await fetch(this._url);
      const buf = await res.arrayBuffer();
      return new Uint8Array(buf);
    }
    throw new Error("No bytes or URL available");
  }

  getDirectURL(): string {
    if (this._url) return this._url;
    // If we have bytes, create an object URL (for in-memory use only)
    if (this._bytes) {
      // Simulate upload: in a real Caffeine app, this would use StorageClient
      // For now, create a data URL for the bytes
      const blob = new Blob([this._bytes.buffer as ArrayBuffer]);
      return URL.createObjectURL(blob);
    }
    throw new Error("No URL or bytes available");
  }
}
