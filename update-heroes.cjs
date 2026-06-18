const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/lib/pages');
const images = {
  'homePage.json': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
  'aboutPage.json': 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
  'servicesPage.json': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
  'portfolioPage.json': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
  'contactPage.json': 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop',
  'blogPage.json': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
  'testimonialsPage.json': 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2000&auto=format&fit=crop',
  'processPage.json': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop'
};

for (const [file, imgUrl] of Object.entries(images)) {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let updated = false;
    for (const section of data.content) {
      if ((section.adminTitle && section.adminTitle.includes('Hero')) || (section.id && section.id.includes('hero'))) {
        if (section.props) {
          section.props.image = imgUrl;
          updated = true;
          console.log(`Updated ${file}`);
        }
      }
    }
    if (updated) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
  }
}
