/**
 * Timestamp detection and conversion utilities for DevCalc.
 * Supports both seconds (10 digits) and milliseconds (13 digits) formats.
 */

export interface TimestampResult {
  isTimestamp: boolean;
  utc: string;
  local: string;
  originalUnit: 'seconds' | 'milliseconds' | null;
}

/**
 * Check if a string looks like a Unix timestamp.
 * - 10 digits: seconds since epoch (1970-2286)
 * - 13 digits: milliseconds since epoch (1970-2286)
 */
export function isTimestamp(input: string): boolean {
  const trimmed = input.trim();
  // Must be exactly 10 or 13 digits
  if (!/^\d{10}$|^\d{13}$/.test(trimmed)) {
    return false;
  }

  const ms = trimmed.length === 13 ? parseInt(trimmed, 10) : parseInt(trimmed, 10) * 1000;

  // Validate it's a reasonable timestamp (between 1970 and 2286)
  // Min: 0 (Jan 1, 1970)
  // Max: 9999999999999 (Nov 20, 2286 in ms)
  return ms >= 0 && ms <= 9999999999999;
}

/**
 * Format a date as "YYYY-MM-DD HH:mm:ss"
 */
function formatDate(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

/**
 * Format a date in UTC as "YYYY-MM-DD HH:mm:ss"
 */
function formatDateUTC(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');

  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
}

/**
 * Convert a timestamp string to human-readable dates.
 * Returns both UTC and local timezone representations.
 */
export function parseTimestamp(input: string): TimestampResult {
  const trimmed = input.trim();

  if (!isTimestamp(trimmed)) {
    return {
      isTimestamp: false,
      utc: '',
      local: '',
      originalUnit: null,
    };
  }

  const isMilliseconds = trimmed.length === 13;
  const ms = isMilliseconds ? parseInt(trimmed, 10) : parseInt(trimmed, 10) * 1000;
  const date = new Date(ms);

  return {
    isTimestamp: true,
    utc: formatDateUTC(date),
    local: formatDate(date),
    originalUnit: isMilliseconds ? 'milliseconds' : 'seconds',
  };
}

/**
 * Get the current Unix timestamp in seconds.
 */
export function getCurrentTimestamp(): string {
  return Math.floor(Date.now() / 1000).toString();
}
