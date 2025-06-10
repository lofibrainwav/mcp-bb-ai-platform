// 메인 대시보드
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

interface MCPTool {
  name: string;
  status: 'connected' | 'ready' | 'api_required' | 'not_ready';
  description: string;
  statusText: string;
}

interface DashboardStats {
  database: {
    status: 'connected' | 'disconnected';
    details: string;
  };
  videos: {
    count: number;
    status: string;
  };
  analysis: {
    count: number;
    status: string;
  };
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'agents' | 'api-keys'>('dashboard');
  const [stats, setStats] = useState<DashboardStats>({
    database: { status: 'connected', details: 'MySQL XAMPP 3306' },
    videos: { count: 3, status: 'Analyzed' },
    analysis: { count: 1, status: 'Completed' }
  });

  const [mcpTools] = useState<MCPTool[]>([
    { name: 'MySQL', status: 'connected', description: 'DB', statusText: '연결됨' },
    { name: 'Playwright', status: 'connected', description: '웹자동화', statusText: '연결됨' },
    { name: 'YouTube', status: 'connected', description: '영상분석', statusText: '연결됨' },
    { name: 'GitHub', status: 'connected', description: '연결됨', statusText: '연결됨' },
    { name: 'Slack', status: 'connected', description: '연결됨', statusText: '연결됨' },
    { name: 'Figma', status: 'api_required', description: 'API 키 필요', statusText: 'API 키 필요' },
    { name: 'OpenAI', status: 'connected', description: '연결됨', statusText: '연결됨' },
    { name: 'Anthropic', status: 'connected', description: '연결됨', statusText: '연결됨' },
    { name: 'Discord', status: 'api_required', description: 'API 키 필요', statusText: 'API 키 필요' },
    { name: 'Notion', status: 'api_required', description: 'API 키 필요', statusText: 'API 키 필요' },
    { name: 'Stripe', status: 'api_required', description: 'API 키 필요', statusText: 'API 키 필요' },
    { name: 'Brave', status: 'connected', description: '연결됨', statusText: '연결됨' },
    { name: 'AWS', status: 'not_ready', description: '미준비', statusText: '미준비' },
    { name: 'Google', status: 'not_ready', description: '미준비', statusText: '미준비' },
    { name: 'Azure', status: 'not_ready', description: '미준비', statusText: '미준비' },
    { name: 'Twilio', status: 'not_ready', description: '미준비', statusText: '미준비' },
    { name: 'Docker', status: 'ready', description: 'MCP Multi-Tool Server (포트 8811)', statusText: 'Docker 준비됨' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'ready': return 'bg-blue-500';
      case 'api_required': return 'bg-orange-500';
      case 'not_ready': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusCount = (status: string) => {
    return mcpTools.filter(tool => tool.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800">
      <Head>
        <title>🤖 AI Agent Platform</title>
        <meta name="description" content="Simple AI Agent Management System" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            🤖 AI Agent Platform
          </h1>
          <p className="text-blue-200 text-lg">Simple AI Agent Management System</p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 rounded-lg p-1 backdrop-blur-sm">
            {['dashboard', 'agents', 'api-keys'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-white text-gray-900'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {tab === 'dashboard' ? 'Dashboard' : 
                 tab === 'agents' ? 'Agents' : 'API Keys'}
              </button>
            ))}
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* 상태 카드들 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Database */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${stats.database.status === 'connected' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <h3 className="text-xl font-semibold">Database</h3>
                </div>
                <p className="text-2xl font-bold mb-1">Connected</p>
                <p className="text-sm text-blue-200">{stats.database.details}</p>
              </div>

              {/* Videos */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Videos</h3>
                <p className="text-2xl font-bold mb-1">{stats.videos.count}</p>
                <p className="text-sm text-blue-200">{stats.videos.status}</p>
              </div>

              {/* Analysis */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Analysis</h3>
                <p className="text-2xl font-bold mb-1">{stats.analysis.count}</p>
                <p className="text-sm text-blue-200">{stats.analysis.status}</p>
              </div>
            </div>

            {/* MCP Tools Status */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                MCP Tools Status ({mcpTools.length}개)
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                {mcpTools.map((tool, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4 text-center">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(tool.status)} mx-auto mb-2`}></div>
                    <h4 className="text-white font-medium mb-1">{tool.name}</h4>
                    <p className="text-xs text-blue-200">{tool.statusText}</p>
                  </div>
                ))}
              </div>

              {/* 상태별 통계 */}
              <div className="flex flex-wrap gap-4 text-white">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>연결됨 ({getStatusCount('connected')}개)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Docker 준비됨 ({getStatusCount('ready')}개)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>API 키 필요 ({getStatusCount('api_required')}개)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>미준비 ({getStatusCount('not_ready')}개)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">AI Agents</h2>
            <p className="text-blue-200">AI 에이전트 관리 기능이 곧 추가됩니다...</p>
          </div>
        )}

        {activeTab === 'api-keys' && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">API Keys</h2>
            <p className="text-blue-200">API 키 관리 기능이 곧 추가됩니다...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
