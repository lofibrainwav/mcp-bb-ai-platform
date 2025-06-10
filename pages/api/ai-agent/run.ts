import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { input } = req.body;
    
    if (!input) {
      return res.status(400).json({ error: '입력이 필요합니다' });
    }

    // Mock AI Agent 응답
    const output = `AI Agent: "${input}" 명령을 처리했습니다. MCP 도구들을 활용하여 작업을 완료했습니다.`;

    res.status(200).json({ 
      output,
      timestamp: new Date().toISOString(),
      tools_used: ['mysql', 'playwright', 'youtube']
    });
  } catch (error) {
    console.error('AI Agent 실행 오류:', error);
    res.status(500).json({ 
      error: 'AI Agent 실행 중 오류가 발생했습니다',
      details: error instanceof Error ? error.message : '알 수 없는 오류'
    });
  }
}
