import dotenv from 'dotenv'
import path from 'path'
import process from 'process'

import getPocketbaseInstance from '../../../tools/forgeCLI/src/commands/db-commands/utils/pocketbase-utils'

dotenv.config({
  path: path.resolve(process.cwd(), '../../env/.env.local'),
  quiet: true
})

const pb = await getPocketbaseInstance()

// Dummy categories data
const categories = [
  {
    name: 'Career & Professional',
    color: '#3B82F6',
    icon: 'tabler:briefcase'
  },
  {
    name: 'Health & Fitness',
    color: '#10B981',
    icon: 'tabler:heart-rate-monitor'
  },
  {
    name: 'Learning & Skills',
    color: '#F59E0B',
    icon: 'tabler:book'
  },
  {
    name: 'Travel & Adventure',
    color: '#EF4444',
    icon: 'tabler:plane'
  },
  {
    name: 'Personal & Lifestyle',
    color: '#8B5CF6',
    icon: 'tabler:user'
  }
]

// Dummy achievements data
const achievements = [
  {
    title: 'Got my first promotion at work',
    thoughts:
      'After 2 years of hard work, finally got recognized. Feeling grateful and motivated to do even better!',
    difficulty: 'medium',
    category: 0 // Will be replaced with actual category ID
  },
  {
    title: 'Ran my first marathon',
    thoughts:
      'Never thought I could do it. The last 5km were brutal but crossing the finish line was incredible.',
    difficulty: 'hard',
    category: 1
  },
  {
    title: 'Learned to play guitar',
    thoughts:
      'Started with simple chords, now I can play my favorite songs. Practice really does make perfect.',
    difficulty: 'medium',
    category: 2
  },
  {
    title: 'Visited 10 countries',
    thoughts:
      'Each country taught me something new about the world and myself. Travel truly broadens the mind.',
    difficulty: 'medium',
    category: 3
  },
  {
    title: 'Quit smoking after 5 years',
    thoughts:
      "One of the hardest things I've ever done. My health and wallet both thank me now.",
    difficulty: 'hard',
    category: 4
  },
  {
    title: 'Built my own website from scratch',
    thoughts:
      "Started knowing nothing about coding. Now I have a portfolio site I'm proud to show off.",
    difficulty: 'medium',
    category: 2
  },
  {
    title: 'Lost 30 pounds',
    thoughts:
      'Consistent diet and exercise for 8 months. The journey was tough but so worth it.',
    difficulty: 'hard',
    category: 1
  },
  {
    title: 'Gave a presentation to 200 people',
    thoughts:
      "Terrified at first, but once I started talking, it felt natural. Public speaking isn't so scary after all.",
    difficulty: 'medium',
    category: 0
  },
  {
    title: 'Climbed Mount Fuji',
    thoughts:
      'The sunrise from the summit was absolutely breathtaking. Worth every step of the climb.',
    difficulty: 'hard',
    category: 3
  },
  {
    title: 'Read 50 books in one year',
    thoughts:
      'Made reading a daily habit. Discovered so many amazing stories and learned countless new things.',
    difficulty: 'medium',
    category: 2
  },
  {
    title: 'Started my own business',
    thoughts:
      'Scary leap from corporate job to entrepreneurship, but following my passion was the right choice.',
    difficulty: 'impossible',
    category: 0
  },
  {
    title: 'Completed a triathlon',
    thoughts:
      'Swimming, biking, and running back-to-back pushed me to my limits. Mind over matter really works.',
    difficulty: 'hard',
    category: 1
  },
  {
    title: 'Learned to speak Spanish fluently',
    thoughts:
      'Two years of practice and immersion paid off. Now I can have deep conversations with native speakers.',
    difficulty: 'hard',
    category: 2
  },
  {
    title: 'Backpacked through Europe solo',
    thoughts:
      'Three weeks, 8 countries, countless memories. Traveling alone taught me self-reliance and confidence.',
    difficulty: 'medium',
    category: 3
  },
  {
    title: 'Adopted a rescue dog',
    thoughts:
      'Best decision ever. Buddy has brought so much joy and love into my life.',
    difficulty: 'easy',
    category: 4
  },
  {
    title: 'Got accepted to graduate school',
    thoughts:
      'Years of preparation and studying paid off. Excited to continue my education journey.',
    difficulty: 'medium',
    category: 2
  },
  {
    title: 'Ran a 5K without stopping',
    thoughts:
      'Started from couch to 5K program. Proves that small consistent steps lead to big achievements.',
    difficulty: 'easy',
    category: 1
  },
  {
    title: 'Landed my dream job',
    thoughts:
      'After dozens of applications and interviews, finally got the call. Persistence really pays off.',
    difficulty: 'hard',
    category: 0
  },
  {
    title: 'Went skydiving',
    thoughts:
      'Conquered my fear of heights in the most extreme way possible. The adrenaline rush was incredible.',
    difficulty: 'medium',
    category: 3
  },
  {
    title: 'Learned to cook properly',
    thoughts:
      'No more takeout every night! Now I can prepare healthy, delicious meals for myself and friends.',
    difficulty: 'easy',
    category: 4
  },
  {
    title: 'Published my first article',
    thoughts:
      "Seeing my name in print was surreal. Writing has always been a passion, now it's becoming more.",
    difficulty: 'medium',
    category: 0
  },
  {
    title: 'Completed a 30-day yoga challenge',
    thoughts:
      'My flexibility and mental clarity improved dramatically. Yoga is now part of my daily routine.',
    difficulty: 'medium',
    category: 1
  },
  {
    title: 'Mastered photography basics',
    thoughts:
      'From auto mode to manual settings, I can now capture moments exactly as I envision them.',
    difficulty: 'medium',
    category: 2
  },
  {
    title: 'Visited all 7 continents',
    thoughts:
      'Antarctica was the final one. Each continent offered unique experiences and perspectives on life.',
    difficulty: 'impossible',
    category: 3
  },
  {
    title: 'Organized my entire house',
    thoughts:
      'Marie Kondo method works! Everything has its place now, and I feel so much more peaceful at home.',
    difficulty: 'easy',
    category: 4
  },
  {
    title: 'Earned a professional certification',
    thoughts:
      'Six months of evening study while working full-time. The certificate opens new career opportunities.',
    difficulty: 'medium',
    category: 0
  },
  {
    title: 'Completed a juice cleanse',
    thoughts:
      'Seven days of only liquids was challenging but reset my relationship with food in a positive way.',
    difficulty: 'medium',
    category: 1
  },
  {
    title: 'Learned to play chess competitively',
    thoughts:
      'From knowing just basic moves to joining a chess club. Strategy games are now my favorite hobby.',
    difficulty: 'medium',
    category: 2
  },
  {
    title: 'Swam with dolphins',
    thoughts:
      'Bucket list item checked off in Hawaii. These intelligent creatures are even more amazing up close.',
    difficulty: 'easy',
    category: 3
  },
  {
    title: 'Decluttered my digital life',
    thoughts:
      'Organized photos, cleaned up social media, and established healthy tech boundaries. Digital minimalism rocks!',
    difficulty: 'easy',
    category: 4
  },
  {
    title: 'Led a successful project team',
    thoughts:
      'Managing 8 people and delivering on time under budget. Leadership skills I never knew I had emerged.',
    difficulty: 'hard',
    category: 0
  },
  {
    title: 'Completed Ironman 70.3',
    thoughts:
      'Half Ironman was brutal - 1.2 mile swim, 56 mile bike, 13.1 mile run. Mental toughness is everything.',
    difficulty: 'impossible',
    category: 1
  },
  {
    title: 'Became conversational in Mandarin',
    thoughts:
      "One of the world's most challenging languages, but persistence and daily practice made it possible.",
    difficulty: 'hard',
    category: 2
  },
  {
    title: 'Drove Route 66 end to end',
    thoughts:
      'Classic American road trip from Chicago to Los Angeles. Saw parts of America I never knew existed.',
    difficulty: 'medium',
    category: 3
  },
  {
    title: 'Started daily meditation practice',
    thoughts:
      'Just 10 minutes a day has improved my focus, reduced stress, and brought more peace to my life.',
    difficulty: 'easy',
    category: 4
  }
]

// Seed categories first
console.log('Seeding categories...')

const createdCategories = []

for (const category of categories) {
  try {
    const created = await pb
      .collection('achievements__categories')
      .create(category)

    createdCategories.push(created)
    console.log(`✓ Created category: ${category.name}`)
  } catch (error) {
    console.error(`✗ Failed to create category ${category.name}:`, error)
  }
}

// Seed achievements with actual category IDs
console.log('\nSeeding achievements...')
let successCount = 0

for (const achievement of achievements) {
  try {
    const achievementData = {
      ...achievement,
      category: createdCategories[achievement.category]?.id || null
    }

    await pb.collection('achievements__entries').create(achievementData)
    console.log(`✓ Created achievement: ${achievement.title}`)
    successCount++
  } catch (error) {
    console.error(
      `✗ Failed to create achievement "${achievement.title}":`,
      error
    )
  }
}

console.log(`\n🎉 Data seeding completed!`)
console.log(`📊 Created ${createdCategories.length} categories`)
console.log(`🏆 Created ${successCount} achievements`)

process.exit(0)
