import { Client } from 'notion-to-utils';

export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const databaseId = process.env.NOTION_DATABASE_ID || '';
