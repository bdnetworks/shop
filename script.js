(function() {
    // শুধুমাত্র এই ডোমেইনে কাজ করবে
    const allowedDomain = "radiopipra.blogspot.com"; // এখানে আপনার সাইটের ডোমেইন লিখুন

    // বর্তমান হোস্ট চেক করা
    if (window.location.hostname !== allowedDomain && window.location.hostname !== "www." + allowedDomain) {
      document.documentElement.innerHTML = ""; // পুরো পেইজ ফাঁকা করে দেওয়া
      alert("This site cannot be viewed outside the official domain.");
      window.stop(); // স্ক্রিপ্ট এক্সিকিউশন থামানো
    }
  })();
