const Hero = () => {
  return (
    <section>
      <div className="absolute top-10 left-10 animate-bounce">🦇</div>
      <div className="absolute top-20 right-20 animate-bounce delay-1000">
        🦇
      </div>
      <div className="absolute bottom-40 left-1/4 animate-bounce delay-500">
        🦇
      </div>

      <header className="text-center mb-8 relative">
        <h1 className="text-4xl font-bold text-orange-400">🎃 TakeExam</h1>
        <div className="mt-2 text-xl text-orange-200">Halloween Edition</div>
      </header>
    </section>
  );
};

export { Hero };
