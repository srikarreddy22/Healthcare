import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, Sparkles, RefreshCw, Loader, Search, Play, Brain } from "lucide-react";

interface Verse {
    scripture: string;
    reference: string;
    explanation: string;
    relevance: string;
}

interface Video {
    title: string;
    url: string;
    keywords: string[];
    category: string;
}

// Video dataset with keywords for matching
const videoDataset: Video[] = [
    {
        title: "Amba Bhavani Sharade, Devotional Song, Sri Ganapathy Sachchidananda Swamiji, Bhajan",
        url: "https://youtu.be/_69BtchVeV0?si=MY0A4ihXqpWhbNnB",
        keywords: ["stress", "anxiety", "peace", "calm", "devotional", "music", "bhajan", "relax", "worried", "tension"],
        category: "Devotional Music"
    },
    {
        title: "Sampoorna Bhagavad Gita Parayana, Ganapathy Sachchidananda Swamiji",
        url: "https://www.youtube.com/live/MvUM5xV6jcg?si=R5yssm8-RSbV_zoO",
        keywords: ["wisdom", "guidance", "philosophy", "knowledge", "gita", "teachings", "life", "purpose", "direction"],
        category: "Spiritual Discourse"
    },
    {
        title: "Solution for Financial Problems, Sundarakanda",
        url: "https://youtu.be/Ca8PN8DASh4?si=b51FTKGZVRlZtcQY",
        keywords: ["financial", "money", "problems", "solutions", "prosperity", "wealth", "success", "abundance", "security"],
        category: "Problem Solutions"
    },
    {
        title: "Unrevealed Secrets, Chandiyagam, Ancient Secrets, Vedic Rituals",
        url: "https://youtu.be/fwDHE0i7N8k?si=7fa8VkluiQPIYz02",
        keywords: ["mystery", "secrets", "ancient", "rituals", "vedic", "knowledge", "wisdom", "esoteric", "hidden"],
        category: "Ancient Wisdom"
    },
    {
        title: "Science of Bhakti yoga, Devotee and Deal Maker",
        url: "https://youtube.com/shorts/oxMMBhf3bd0?si=TY8otAHY54oDDI5X",
        keywords: ["yoga", "bhakti", "devotion", "spiritual", "practice", "meditation", "mindfulness", "focus", "connection"],
        category: "Yoga & Meditation"
    },
    {
        title: "Iskcon, Thiruppavai (Telugu)",
        url: "https://youtu.be/cuTtPbYPUII?si=ZgXEN1csJPboq5h7",
        keywords: ["devotional", "prayer", "telugu", "iskcon", "music", "peace", "calm", "worship", "divine"],
        category: "Devotional Music"
    },
    {
        title: "Iskcon, Thiruppavai (Telugu)",
        url: "https://youtu.be/4c275S6ZAKI?si=MdHhL8To0ROhQIaO",
        keywords: ["devotional", "prayer", "telugu", "iskcon", "music", "peace", "calm", "worship", "divine"],
        category: "Devotional Music"
    },
    {
        title: "Iskcon, Thiruppavai (Telugu)",
        url: "https://youtu.be/5EOXirf44kI?si=vFJKyDVSs6sVJq-W",
        keywords: ["devotional", "prayer", "telugu", "iskcon", "music", "peace", "calm", "worship", "divine"],
        category: "Devotional Music"
    }
];

// Function to extract video ID from YouTube URL
const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
};

// Training a simple keyword matching model
const trainModel = (dataset: Video[]) => {
    // Create an index of keywords to videos
    const keywordIndex: Record<string, Video[]> = {};

    dataset.forEach(video => {
        video.keywords.forEach(keyword => {
            if (!keywordIndex[keyword]) {
                keywordIndex[keyword] = [];
            }
            keywordIndex[keyword].push(video);
        });
    });

    return {
        // Function to find videos based on input text
        findVideos: (input: string) => {
            const inputWords = input.toLowerCase().split(/\s+/);
            const matches: Record<string, number> = {};

            // Score each video based on keyword matches
            dataset.forEach(video => {
                let score = 0;
                inputWords.forEach(word => {
                    if (video.keywords.includes(word)) {
                        score += 2; // Exact match
                    } else {
                        // Partial match checking
                        video.keywords.forEach(keyword => {
                            if (keyword.includes(word) || word.includes(keyword)) {
                                score += 1;
                            }
                        });
                    }
                });

                if (score > 0) {
                    matches[video.url] = score;
                }
            });

            // Sort videos by match score
            return dataset
                .filter(video => matches[video.url] > 0)
                .sort((a, b) => matches[b.url] - matches[a.url]);
        }
    };
};

// Generate description using Gemini API
const generateDescriptionWithGemini = async (userInput: string, video: Video): Promise<string> => {
    const apiKey = "AIzaSyDLQPM-0CH_RdjgQAtf_4v7-e-ddz7LcoU";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `A user is feeling: "${userInput}". 
            Recommend this video: "${video.title}" (Category: ${video.category}).
            
            Please provide a compassionate, supportive description that:
            1. Acknowledges their feelings
            2. Explains why this video might help
            3. Is encouraging and hopeful
            4. Keeps it brief (2-3 sentences)
            
            Response should be in a natural, conversational tone.`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 150,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text.trim();
    } catch (error) {
        console.error('Gemini API error:', error);
        return `This ${video.category} content may help with ${userInput}. Many have found comfort and guidance in these teachings.`;
    }
};

export const InspirationalVerses = () => {
    const [verses, setVerses] = useState<Verse[]>([]);
    const [loading, setLoading] = useState(false);
    const [userContext, setUserContext] = useState("");
    const [recommendations, setRecommendations] = useState<Video[]>([]);
    const [descriptions, setDescriptions] = useState<Record<string, string>>({});
    const [searchInput, setSearchInput] = useState("");
    const [showVideoRecommendations, setShowVideoRecommendations] = useState(false);
    const model = trainModel(videoDataset);

    // Predefined verses as fallback
    const fallbackVerses: Verse[] = [
        {
            scripture: "Karmany evādhikāras te mā phaleṣu kadācana. Mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi.",
            reference: "Bhagavad Gītā 2.47",
            explanation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",
            relevance: "Focus on your actions, not on the results—let this reduce stress from outcomes."
        },
        {
            scripture: "Yato yato niścarati manaś cañcalam asthiram, tatas tato niyamyaitad ātmany eva vaśaṁ nayet.",
            reference: "Bhagavad Gītā 6.26",
            explanation: "From wherever the mind wanders due to its flickering and unsteady nature, one must certainly withdraw it and bring it back under the control of the Self.",
            relevance: "When the mind wanders, gently bring it back—useful for mindful study breaks."
        },
        {
            scripture: "Yasmān nodvijate loko lokān nodvijate ca yaḥ...",
            reference: "Bhagavad Gītā 12.15",
            explanation: "One who is not disturbed by the incessant flow of desires—that enter like rivers into the ocean, which is ever being filled but is always still—can alone achieve peace.",
            relevance: "Cultivate calm and compassion—create a supportive peer environment."
        }
    ];

    // Generate verses using Gemini API
    const generateVersesWithGemini = async (context: string): Promise<Verse[]> => {
        const apiKey = "AIzaSyDLQPM-0CH_RdjgQAtf_4v7-e-ddz7LcoU";

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Generate 3 inspirational verses from Hindu scriptures (Bhagavad Gita, Upanishads, etc.) that would be helpful for a ${context}.
              
              For each verse, provide:
              1. The original Sanskrit text (transliterated)
              2. The scripture reference
              3. A simple English translation/explanation
              4. How it's relevant to the user's situation
              
              Format the response as a JSON array with these fields: scripture, reference, explanation, relevance.`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const textResponse = data.candidates[0].content.parts[0].text;

            // Try to extract JSON from the response
            try {
                const jsonMatch = textResponse.match(/\[\s*{[\s\S]*}\s*\]/);
                if (jsonMatch) {
                    return JSON.parse(jsonMatch[0]);
                }
            } catch (e) {
                console.error("Failed to parse JSON response:", e);
            }

            // If JSON parsing fails, return fallback
            return fallbackVerses;
        } catch (error) {
            console.error('Gemini API error:', error);
            return fallbackVerses;
        }
    };

    const handleSearch = async () => {
        if (!searchInput.trim()) return;

        setLoading(true);
        setUserContext(searchInput);

        try {
            // Get video recommendations
            const videoResults = model.findVideos(searchInput);
            setRecommendations(videoResults);

            // Generate descriptions for each recommended video
            const newDescriptions: Record<string, string> = {};
            for (const video of videoResults.slice(0, 3)) { // Limit to top 3
                const description = await generateDescriptionWithGemini(searchInput, video);
                newDescriptions[video.url] = description;
            }

            setDescriptions(newDescriptions);

            // Generate inspirational verses
            const newVerses = await generateVersesWithGemini(searchInput);
            setVerses(newVerses);

            setShowVideoRecommendations(true);
        } catch (error) {
            console.error("Error generating content:", error);
            setVerses(fallbackVerses);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        // Initialize with some verses
        setVerses(fallbackVerses);
    }, []);

    return (
        <Card className="border-0 shadow-large bg-card/70 backdrop-blur">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Book className="w-5 h-5 text-accent" /> Spiritual Guidance
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Search Input */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <Input
                        placeholder="How are you feeling? (e.g., stressed, anxious, need guidance...)"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="flex-1"
                    />
                    <Button
                        onClick={handleSearch}
                        disabled={loading}
                        className="bg-gradient-to-r from-primary to-secondary"
                    >
                        {loading ? (
                            <Loader className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                            <Search className="w-4 h-4 mr-2" />
                        )}
                        Find Guidance
                    </Button>
                </div>

                {showVideoRecommendations && recommendations.length > 0 && (
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <Play className="w-5 h-5 text-primary" />
                            Recommended Content for "{userContext}"
                        </h3>
                        <div className="space-y-4">
                            {recommendations.slice(0, 2).map((video) => (
                                <div key={video.url} className="p-4 rounded-xl bg-secondary-soft border border-secondary/20">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="md:w-1/3">
                                            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden relative">
                                                <img
                                                    src={`https://img.youtube.com/vi/${getYouTubeId(video.url)}/mqdefault.jpg`}
                                                    alt={video.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                    <a
                                                        href={video.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                                                    >
                                                        <Play className="h-5 w-5 fill-current" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:w-2/3">
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-medium text-sm">{video.title}</h4>
                                                <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                                                    {video.category}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                {descriptions[video.url] || "Loading description..."}
                                            </p>
                                            <a
                                                href={video.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium"
                                            >
                                                <Play className="h-4 w-4 mr-1" />
                                                Watch Video
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Inspirational Verses */}
                <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-accent" />
                        {userContext ? `Inspirational Verses for "${userContext}"` : "Inspirational Verses"}
                    </h3>
                    <div className="space-y-3">
                        {verses.map((verse, index) => (
                            <div key={index} className="p-4 rounded-xl bg-accent-soft border border-accent/20">
                                <p className="text-sm font-medium">{verse.reference}</p>
                                <p className="text-sm text-muted-foreground mt-1 font-semibold">{verse.scripture}</p>
                                <p className="text-sm text-muted-foreground mt-1">{verse.explanation}</p>
                                <p className="text-xs mt-2 text-accent font-medium">{verse.relevance}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {!userContext && (
                    <div className="text-center py-4 text-sm text-muted-foreground">
                        <Brain className="w-6 h-6 mx-auto mb-2 opacity-50" />
                        <p>Share how you're feeling to get personalized spiritual guidance</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};