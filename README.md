## Rules for Number pitch accent

- Lorsque précédé par 十 (JUU / 10) les nombres standards à l'exception de 3 and 5 gardent leur downstep
  => donc 11 = ju u i chi wa = LHHHL
  => donc 13 = ju u sa n wa = HLLLL
  => donc 15 = ju u go wa = HLLL

- Les nombre 20..30....90 et les nombres 100..200....900 n'ont pas de règles précise, donc il faut les connaitre par coeur.

  - Ces connaissances peuvent être réutilisées pour les compositions de gros nombres

- Lorsque précédé par 千 (SEN/mille) ou 万 (MAN / 10000) le nombre résultant est nakadaka avec le drop sur SEN et MAN
  => donc 2000 = ni se n wa = LHLL

COMPLEX NUMBER COMPOUNDS

- Each element in a complex number compound retains its normal downstep with the exception of trailing accented JUU (10) and accented HYAKU (100)
- trailing accented X means that X is accented AND preceeded by a number. Donc HYAKU qui ne suit pas la règle "trailing" respecte la règle même s'il n'y a aucun nombre derrière lui
- Si aucun nombre ne suit HYAKU ou JUU, ils gardent leur downstep
  => donc 89 : ha chi ju u ky u wa = LHHHHLL

Endroits flous :

- 110 : Rien après 10 donc hya/ku ju\u wa

- 11000 ichi man sen : vu que man et sen respectent la règle du précédent qui devient heiban avec le drop sur sen ou man (donc que le résultant est nakadaka) lequel prévaut ? => sen puisqu'il est en dernier. DONC : l'algorithme doit parcourir le nombre dans l'ordre de lecture, comme ça, lorsqu'on passe sur SEN, on efface l'accent de MAN

- 11110 ichi man sen hyaku juu : on applique les deux trouvailles au dessus et ça passe à priori

- 2100 : Rien après 100 donc ni/se\n hya/ku\wa

DONC en gros pour reformuler :

- Si une DIZAINE subit un downstep sur le JU\U ou JUU\ ET qu'il est précédé par un nombre (une unité genre 52 ou autre genre 310) ET qu'il est suivi par un nombre : il perd son downstep (donc flat soit en haut soit en bas)
  - 52 : perd le downstep sur le JUU
  - 310 : garde le downstep sur le HYAKU et garde le downstep sur le JUU
  - 250 : perd le downstep sur le HYAKU et garde le downstep sur le JUU
  - 251 : perd le downstep sur le HYAKU et perd le downstep sur le JUU
- Si une CENTAINE subit un downstep sur le HYA\KU ou HYAKU\ ET qu'il est suivi par un nombre : il perd son downstep (donc souvent heiban)

253 = heiban => le juu san ne subit pas le atamadaka puisque il y a go devant
