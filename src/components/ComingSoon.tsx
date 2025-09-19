interface ComingSoonProps {
  title: string;
  description: string;
  icon: string;
}

const ComingSoon = ({ title, description, icon }: ComingSoonProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
          <div className="text-6xl mb-6">{icon}</div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">{title}</h1>
          <p className="text-slate-600 mb-8 leading-relaxed">{description}</p>
          
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-full inline-block">
            <span className="font-semibold">Coming Soon</span>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-slate-500">
              We're working hard to bring you this feature. Stay tuned!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;