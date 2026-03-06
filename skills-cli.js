#!/usr/bin/env node
/**
 * skills-cli.js — Gestore della libreria di skill Claude Code
 * Uso: node skills-cli.js <comando> [argomenti]
 */

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CATALOG_PATH = join(__dirname, 'catalog.json');
const SKILLS_DIR = join(__dirname, 'skills');
const COMMANDS_DIR = join(__dirname, '.claude', 'commands');

function loadCatalog() {
  return JSON.parse(readFileSync(CATALOG_PATH, 'utf8'));
}

function saveCatalog(catalog) {
  catalog.updated_at = new Date().toISOString().split('T')[0];
  writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));
}

function colorize(text, code) {
  return `\x1b[${code}m${text}\x1b[0m`;
}

const bold = (t) => colorize(t, 1);
const green = (t) => colorize(t, 32);
const yellow = (t) => colorize(t, 33);
const cyan = (t) => colorize(t, 36);
const red = (t) => colorize(t, 31);
const gray = (t) => colorize(t, 90);

function stars(n) {
  if (!n) return gray('non valutata');
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

function categoryBadge(cat) {
  const colors = {
    development: 36,
    security: 31,
    devops: 33,
    scientific: 35,
    creative: 32,
    testing: 34,
  };
  return colorize(`[${cat}]`, colors[cat] || 37);
}

// ─── COMANDI ──────────────────────────────────────────────────────────────────

function cmdList(args) {
  const catalog = loadCatalog();
  const filterCat = args.find(a => a.startsWith('--category='))?.split('=')[1];
  const filterTag = args.find(a => a.startsWith('--tag='))?.split('=')[1];

  let skills = catalog.skills;
  if (filterCat) skills = skills.filter(s => s.category === filterCat);
  if (filterTag) skills = skills.filter(s => s.tags.includes(filterTag));

  console.log(bold(`\n📚 Libreria Skill Claude Code (${skills.length} skill)\n`));

  const byCategory = skills.reduce((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {});

  for (const [cat, list] of Object.entries(byCategory)) {
    console.log(bold(categoryBadge(cat).padEnd(20) + ` ${cat.toUpperCase()}`));
    for (const s of list) {
      const installed = s.installed ? green('✓') : gray('○');
      const tested = s.tested ? cyan('T') : gray('-');
      const rating = s.rating ? yellow(stars(s.rating)) : gray('·····');
      console.log(`  ${installed} ${tested} ${bold(s.id.padEnd(28))} ${rating}  ⭐${s.stars || '?'}`);
      console.log(`     ${gray(s.description.substring(0, 80))}${s.description.length > 80 ? '…' : ''}`);
    }
    console.log('');
  }

  console.log(gray('Legenda: ✓=installata  T=testata  ★=valutazione'));
  console.log(gray('Filtri:  --category=<cat>  --tag=<tag>'));
}

function cmdSearch(args) {
  const query = args[0]?.toLowerCase();
  if (!query) { console.error(red('Uso: node skills-cli.js search <query>')); process.exit(1); }

  const catalog = loadCatalog();
  const results = catalog.skills.filter(s =>
    s.name.toLowerCase().includes(query) ||
    s.description.toLowerCase().includes(query) ||
    s.tags.some(t => t.includes(query)) ||
    s.category.includes(query)
  );

  if (!results.length) {
    console.log(yellow(`Nessuna skill trovata per "${query}"`));
    return;
  }

  console.log(bold(`\n🔍 Risultati per "${query}" (${results.length}):\n`));
  for (const s of results) {
    console.log(`  ${categoryBadge(s.category)} ${bold(s.id)}`);
    console.log(`  ${s.name} — ${gray(s.description.substring(0, 100))}`);
    console.log(`  ${cyan(s.source)}`);
    console.log(`  Tags: ${s.tags.map(t => gray(t)).join(', ')}\n`);
  }
}

function cmdInfo(args) {
  const id = args[0];
  if (!id) { console.error(red('Uso: node skills-cli.js info <id>')); process.exit(1); }

  const catalog = loadCatalog();
  const skill = catalog.skills.find(s => s.id === id);
  if (!skill) { console.error(red(`Skill "${id}" non trovata. Usa "list" per vedere tutte.`)); process.exit(1); }

  console.log(bold(`\n📋 ${skill.name}\n`));
  console.log(`  ID:          ${cyan(skill.id)}`);
  console.log(`  Categoria:   ${categoryBadge(skill.category)}`);
  console.log(`  Descrizione: ${skill.description}`);
  console.log(`  Fonte:       ${cyan(skill.source)}`);
  console.log(`  Stelle GitHub: ⭐ ${skill.stars || 'N/D'}`);
  console.log(`  Valutazione: ${stars(skill.rating)}`);
  console.log(`  Installata:  ${skill.installed ? green('Sì') : red('No')}`);
  console.log(`  Testata:     ${skill.tested ? cyan('Sì') : gray('No')}`);
  console.log(`  Tags:        ${skill.tags.join(', ')}`);
  console.log(`  Aggiunta il: ${skill.added_at}\n`);

  if (!skill.installed) {
    console.log(yellow(`  Per installare: node skills-cli.js install ${skill.id}`));
  }
}

function cmdInstall(args) {
  const id = args[0];
  if (!id) { console.error(red('Uso: node skills-cli.js install <id>')); process.exit(1); }

  const catalog = loadCatalog();
  const skill = catalog.skills.find(s => s.id === id);
  if (!skill) { console.error(red(`Skill "${id}" non trovata.`)); process.exit(1); }

  const skillFile = join(SKILLS_DIR, skill.category, `${skill.id}.md`);
  const targetFile = join(COMMANDS_DIR, `${skill.id}.md`);

  if (!existsSync(skillFile)) {
    console.log(yellow(`⚠  File skill non trovato: ${skillFile}`));
    console.log(yellow(`   Scarica prima la skill da: ${skill.source}`));
    console.log(yellow(`   Poi salvala in: skills/${skill.category}/${skill.id}.md`));
    return;
  }

  mkdirSync(COMMANDS_DIR, { recursive: true });
  copyFileSync(skillFile, targetFile);

  skill.installed = true;
  saveCatalog(catalog);

  console.log(green(`✓ Skill "${skill.name}" installata in .claude/commands/${skill.id}.md`));
  console.log(gray(`  Invoca con: /${skill.id}`));
}

function cmdRate(args) {
  const [id, ratingStr] = args;
  if (!id || !ratingStr) { console.error(red('Uso: node skills-cli.js rate <id> <1-5>')); process.exit(1); }

  const rating = parseInt(ratingStr);
  if (isNaN(rating) || rating < 1 || rating > 5) {
    console.error(red('La valutazione deve essere un numero da 1 a 5'));
    process.exit(1);
  }

  const catalog = loadCatalog();
  const skill = catalog.skills.find(s => s.id === id);
  if (!skill) { console.error(red(`Skill "${id}" non trovata.`)); process.exit(1); }

  skill.rating = rating;
  skill.tested = true;
  saveCatalog(catalog);

  console.log(green(`✓ Valutazione salvata: ${skill.name} → ${stars(rating)}`));
}

function cmdAdd(args) {
  if (args.length < 4) {
    console.error(red('Uso: node skills-cli.js add <id> <nome> <categoria> <url-github> [descrizione]'));
    console.error(gray('Categorie disponibili: development, security, devops, scientific, creative, testing'));
    process.exit(1);
  }

  const [id, name, category, source, ...descParts] = args;
  const description = descParts.join(' ') || 'Nessuna descrizione';

  const validCategories = ['development', 'security', 'devops', 'scientific', 'creative', 'testing'];
  if (!validCategories.includes(category)) {
    console.error(red(`Categoria non valida. Usa: ${validCategories.join(', ')}`));
    process.exit(1);
  }

  const catalog = loadCatalog();
  if (catalog.skills.find(s => s.id === id)) {
    console.error(red(`Skill con id "${id}" già esistente.`));
    process.exit(1);
  }

  catalog.skills.push({
    id,
    name,
    description,
    category,
    source,
    stars: null,
    rating: null,
    tested: false,
    installed: false,
    tags: [],
    added_at: new Date().toISOString().split('T')[0],
  });

  saveCatalog(catalog);
  console.log(green(`✓ Skill "${name}" aggiunta al catalogo con id "${id}"`));
  console.log(gray(`  Modifica catalog.json per aggiungere tags e altri dettagli.`));
}

function cmdStats() {
  const catalog = loadCatalog();
  const skills = catalog.skills;
  const installed = skills.filter(s => s.installed).length;
  const tested = skills.filter(s => s.tested).length;
  const rated = skills.filter(s => s.rating).length;
  const avgRating = rated
    ? (skills.filter(s => s.rating).reduce((a, s) => a + s.rating, 0) / rated).toFixed(1)
    : 'N/D';

  const byCat = skills.reduce((acc, s) => { acc[s.category] = (acc[s.category] || 0) + 1; return acc; }, {});

  console.log(bold('\n📊 Statistiche Libreria Skill\n'));
  console.log(`  Totale skill:   ${bold(skills.length)}`);
  console.log(`  Installate:     ${green(installed)} / ${skills.length}`);
  console.log(`  Testate:        ${cyan(tested)} / ${skills.length}`);
  console.log(`  Valutate:       ${yellow(rated)} (media: ${avgRating})`);
  console.log('');
  console.log(bold('  Per categoria:'));
  for (const [cat, count] of Object.entries(byCat)) {
    console.log(`    ${categoryBadge(cat).padEnd(25)} ${count}`);
  }
  console.log('');
}

function cmdHelp() {
  console.log(bold('\n🎯 Skills CLI — Gestore Libreria Skill Claude Code\n'));
  console.log('  Comandi disponibili:\n');
  console.log(`  ${cyan('list')}   [--category=<cat>] [--tag=<tag>]   Mostra tutte le skill`);
  console.log(`  ${cyan('search')} <query>                            Cerca per nome/tag/descrizione`);
  console.log(`  ${cyan('info')}   <id>                               Dettagli di una skill`);
  console.log(`  ${cyan('install')} <id>                              Installa in .claude/commands/`);
  console.log(`  ${cyan('rate')}   <id> <1-5>                         Valuta una skill dopo test`);
  console.log(`  ${cyan('add')}    <id> <nome> <cat> <url> [desc]     Aggiungi skill al catalogo`);
  console.log(`  ${cyan('stats')}                                     Mostra statistiche`);
  console.log(`  ${cyan('help')}                                      Mostra questo aiuto`);
  console.log('');
  console.log(gray('  Categorie: development | security | devops | scientific | creative | testing'));
  console.log(gray('  Esempi:'));
  console.log(gray('    node skills-cli.js list --category=security'));
  console.log(gray('    node skills-cli.js search playwright'));
  console.log(gray('    node skills-cli.js install superpowers'));
  console.log(gray('    node skills-cli.js rate superpowers 5'));
  console.log('');
}

// ─── ROUTER ───────────────────────────────────────────────────────────────────

const [,, cmd, ...args] = process.argv;

switch (cmd) {
  case 'list':    cmdList(args); break;
  case 'search':  cmdSearch(args); break;
  case 'info':    cmdInfo(args); break;
  case 'install': cmdInstall(args); break;
  case 'rate':    cmdRate(args); break;
  case 'add':     cmdAdd(args); break;
  case 'stats':   cmdStats(); break;
  case 'help':
  case undefined: cmdHelp(); break;
  default:
    console.error(red(`Comando sconosciuto: "${cmd}". Usa "help" per la lista comandi.`));
    process.exit(1);
}
