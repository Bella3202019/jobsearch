// src/app/api/jobs/route.ts
import { NextResponse } from 'next/server'

interface Job {
 id: number
 title: string
 company: string
 location: string
 salary: string
 description: string
 company_culture: string
 diversity_types: string[]
 benefits: string[]
 type: string
}

// mockJobs array here...
const mockJobs = [
    {
      id: 1,
      title: 'Product Manager',
      company: 'American Express',
      location: 'New York',
      salary: '$120k-180k',
      description: 'Lead digital payments product team, drive fintech innovation.',
      company_culture: 'Collaborative environment focused on innovation',
      diversity_types: ['Women in Tech', 'Veterans', 'LGBTQ+'],
      benefits: ['Remote work', 'Health insurance', '401k'],
      type: 'Full-time'
    },
    {
      id: 2, 
      title: 'Software Engineer',
      company: 'Bank of America',
      location: 'London',
      salary: '£70k-90k',
      description: 'Build next-gen trading platforms.',
      company_culture: 'Fast-paced, continuous learning',
      diversity_types: ['People of Color', 'Women in Tech'],
      benefits: ['Flexible hours', 'Learning budget', 'Stock options'],
      type: 'Full-time'
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'Goldman Sachs',
      location: 'Singapore',
      salary: 'S$120k-160k',
      description: 'Apply ML/AI to financial markets.',
      company_culture: 'Excellence-driven, innovative',
      diversity_types: ['Women in STEM', 'Asian Heritage'],
      benefits: ['Housing allowance', 'Education support'],
      type: 'Full-time'
    },
    {
      id: 4,
      title: 'UX Designer',
      company: 'HSBC',
      location: 'Hong Kong',
      salary: 'HK$600k-800k',
      description: 'Design digital banking experiences.',
      company_culture: 'User-centric, collaborative',
      diversity_types: ['Women in Design', 'LGBTQ+'],
      benefits: ['Health care', 'Annual bonus'],
      type: 'Full-time'
    },
    {
      id: 5,
      title: 'Risk Analyst',
      company: 'JP Morgan',
      location: 'Chicago',
      salary: '$90k-120k',
      description: 'Assess financial market risks.',
      company_culture: 'Data-driven decision making',
      diversity_types: ['Veterans', 'Hispanic Heritage'],
      benefits: ['401k match', 'Work from home'],
      type: 'Full-time'
    },
    {
      id: 6,
      title: 'Compliance Officer',
      company: 'Citibank',
      location: 'Dubai',
      salary: 'AED 300k-400k',
      description: 'Ensure regulatory compliance.',
      company_culture: 'Integrity-focused',
      diversity_types: ['Middle Eastern Heritage'],
      benefits: ['Housing', 'Transportation'],
      type: 'Full-time'
    },
    {
      id: 7,
      title: 'Marketing Manager',
      company: 'Standard Chartered',
      location: 'Mumbai',
      salary: '₹2500k-3000k',
      description: 'Lead digital marketing initiatives.',
      company_culture: 'Creative, results-driven',
      diversity_types: ['Women Leaders', 'South Asian Heritage'],
      benefits: ['Health insurance', 'Stock options'],
      type: 'Full-time'
    },
    {
      id: 8,
      title: 'Blockchain Developer',
      company: 'Deutsche Bank',
      location: 'Berlin',
      salary: '€80k-100k',
      description: 'Develop blockchain solutions.',
      company_culture: 'Innovation-focused',
      diversity_types: ['Tech Diversity', 'LGBTQ+'],
      benefits: ['Flexible hours', 'Remote work'],
      type: 'Full-time'
    },
    {
      id: 9,
      title: 'Investment Analyst',
      company: 'Morgan Stanley',
      location: 'Sydney',
      salary: 'A$100k-130k',
      description: 'Analyze investment opportunities.',
      company_culture: 'Performance-driven',
      diversity_types: ['Women in Finance', 'Pacific Islander'],
      benefits: ['Bonus', 'Health cover'],
      type: 'Full-time'
    },
    {
      id: 10,
      title: 'Cloud Architect',
      company: 'Barclays',
      location: 'Toronto',
      salary: 'C$130k-160k',
      description: 'Design cloud infrastructure.',
      company_culture: 'Tech-forward, collaborative',
      diversity_types: ['Indigenous People', 'Women in Tech'],
      benefits: ['Remote work', 'Learning budget'],
      type: 'Full-time'
    },
    {
      id: 11,
      title: 'Quantitative Trader',
      company: 'Credit Suisse',
      location: 'Zurich',
      salary: 'CHF 150k-200k',
      description: 'Develop trading strategies.',
      company_culture: 'Analytical, innovative',
      diversity_types: ['Women in Trading', 'LGBTQ+'],
      benefits: ['Bonus', 'Relocation'],
      type: 'Full-time'
    },
    {
      id: 12,
      title: 'HR Manager',
      company: 'BNP Paribas',
      location: 'Paris',
      salary: '€70k-90k',
      description: 'Lead HR initiatives.',
      company_culture: 'People-first approach',
      diversity_types: ['Women Leaders', 'Disability inclusion'],
      benefits: ['Healthcare', 'Work-life balance'],
      type: 'Full-time'
    },
    {
      id: 13,
      title: 'Mobile Developer',
      company: 'UBS',
      location: 'Shanghai',
      salary: '¥400k-600k',
      description: 'Build mobile banking apps.',
      company_culture: 'Agile, innovative',
      diversity_types: ['Asian Heritage', 'Women in Tech'],
      benefits: ['Housing allowance', 'Insurance'],
      type: 'Full-time'
    },
    {
      id: 14,
      title: 'Business Analyst',
      company: 'Santander',
      location: 'Madrid',
      salary: '€45k-60k',
      description: 'Analyze business processes.',
      company_culture: 'Customer-focused',
      diversity_types: ['Hispanic Heritage', 'Women in Business'],
      benefits: ['Flexible hours', 'Training'],
      type: 'Full-time'
    },
    {
      id: 15,
      title: 'Security Engineer',
      company: 'ING',
      location: 'Amsterdam',
      salary: '€65k-85k',
      description: 'Protect digital assets.',
      company_culture: 'Security-first mindset',
      diversity_types: ['Veterans', 'Women in Security'],
      benefits: ['Bike allowance', 'Healthcare'],
      type: 'Full-time'
    },
    {
      id: 16,
      title: 'Finance Manager',
      company: 'Wells Fargo',
      location: 'San Francisco',
      salary: '$130k-160k',
      description: 'Manage financial operations.',
      company_culture: 'Result-oriented',
      diversity_types: ['Asian American', 'Women in Finance'],
      benefits: ['401k', 'Stock options'],
      type: 'Full-time'
    },
    {
      id: 17,
      title: 'AI Research Scientist',
      company: 'DBS Bank',
      location: 'Singapore',
      salary: 'S$150k-200k',
      description: 'Research AI applications in finance.',
      company_culture: 'Research-driven innovation',
      diversity_types: ['Women in AI', 'Asian Heritage'],
      benefits: ['Research budget', 'Conference travel'],
      type: 'Full-time'
    },
    {
      id: 18,
      title: 'Project Manager',
      company: 'Lloyds Bank',
      location: 'Manchester',
      salary: '£60k-75k',
      description: 'Lead digital transformation projects.',
      company_culture: 'Collaborative leadership',
      diversity_types: ['Women Leaders', 'LGBTQ+'],
      benefits: ['Flexible work', 'Pension'],
      type: 'Full-time'
    },
    {
      id: 19,
      title: 'DevOps Engineer',
      company: 'Nordea',
      location: 'Stockholm',
      salary: 'SEK 600k-750k',
      description: 'Manage CI/CD pipelines.',
      company_culture: 'Automation-focused',
      diversity_types: ['Women in Tech', 'Disability inclusion'],
      benefits: ['Remote work', 'Wellness program'],
      type: 'Full-time'
    },
    {
      id: 20,
      title: 'Digital Strategy Director',
      company: 'Scotiabank',
      location: 'Toronto',
      salary: 'C$160k-200k',
      description: 'Shape digital banking strategy.',
      company_culture: 'Innovation-driven leadership',
      diversity_types: ['Indigenous People', 'Women Executives'],
      benefits: ['Leadership training', 'Stock options'],
      type: 'Full-time'
    }
   ]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const location = searchParams.get('location') || '';
  const company = searchParams.get('company') || '';
  const diversity = searchParams.get('diversity') || '';

  let results = mockJobs;

  if (query) {
    const searchQuery = query.toLowerCase();
    results = results.filter(job =>
      job.title.toLowerCase().includes(searchQuery) ||
      job.description.toLowerCase().includes(searchQuery)
    );
  }

  if (location) {
    results = results.filter(job =>
      job.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  if (company) {
    results = results.filter(job =>
      job.company.toLowerCase().includes(company.toLowerCase())
    );
  }

  if (diversity) {
    results = results.filter(job =>
      job.diversity_types.some(type => 
        type.toLowerCase().includes(diversity.toLowerCase())
      )
    );
  }

  return NextResponse.json({
    total: results.length,
    jobs: results
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body type:', body?.message?.type);
    
    // 检查消息类型
    const messageType = body?.message?.type;
    
    // 处理状态更新和通话结束报告
    if (messageType === 'status-update' || messageType === 'end-of-call-report') {
      return NextResponse.json({
        status: 'ok',
        message: `${messageType} received`
      });
    }

    // 从不同位置尝试获取 tool call
    let toolCall = null;
    
    // 1. 直接从 message.tool_calls 获取
    if (body?.message?.tool_calls?.[0]) {
      toolCall = body.message.tool_calls[0];
    }
    // 2. 从 artifact.messages 获取最后一个 tool_calls
    else if (body?.message?.artifact?.messages) {
      const messages = body.message.artifact.messages;
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].tool_calls?.[0]) {
          toolCall = messages[i].tool_calls[0];
          break;
        }
      }
    }

    if (!toolCall) {
      console.error('Tool call not found in body');
      throw new Error('No tool call found');
    }

    const toolCallId = toolCall.id;
    
    // 处理 arguments
    let params;
    try {
      const args = toolCall.function.arguments;
      params = typeof args === 'string' ? JSON.parse(args) : args;
    } catch (e) {
      console.error('Error parsing arguments:', e);
      params = {};
    }

    const query = params.query || '';
    const location = params.location || '';
    const company = params.company || '';
    const diversity = params.diversity || '';

    let results = mockJobs;

    if (query) {
      const searchQuery = query.toLowerCase();
      results = results.filter(job =>
        job.title.toLowerCase().includes(searchQuery) ||
        job.description.toLowerCase().includes(searchQuery)
      );
    }

    if (location) {
      results = results.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (company) {
      results = results.filter(job =>
        job.company.toLowerCase().includes(company.toLowerCase())
      );
    }

    if (diversity) {
      results = results.filter(job =>
        job.diversity_types.some(type => 
          type.toLowerCase().includes(diversity.toLowerCase())
        )
      );
    }

    // 只返回前 3 个结果
    const limitedResults = results.slice(0, 3);

    return NextResponse.json({
      results: [
        {
          toolCallId: toolCallId,
          result: JSON.stringify({
            total: results.length, // 保持总数不变
            jobs: limitedResults  // 只返回前 3 个
          })
        }
      ]
    });

  } catch (error: unknown) {
    console.error('Error processing request:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unknown error occurred';

    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}