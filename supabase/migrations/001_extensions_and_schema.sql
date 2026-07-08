-- Migration 001: extensions and custom schema
-- Run in Supabase SQL Editor (new query) after any earlier migrations in this folder.

create extension if not exists pgcrypto;

create schema if not exists abdirahmaan;

grant usage on schema abdirahmaan to anon, authenticated, service_role;
