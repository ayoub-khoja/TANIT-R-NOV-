let avis = [];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(avis);
  } else if (req.method === "POST") {
    const { prenom, nom, ville, texte, note, avatar } = req.body;
    if (!prenom || !nom || !ville || !texte || !note || !avatar) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }
    const nouvelAvis = {
      id: Date.now(),
      name: prenom + " " + nom,
      city: ville,
      rating: note,
      text: texte,
      avatar: avatar
    };
    avis.push(nouvelAvis);
    res.status(201).json(nouvelAvis);
  } else {
    res.status(405).end();
  }
} 