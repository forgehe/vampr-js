class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numFromOrig = 0;
    let vamp = this;
    while (vamp.creator) {
      numFromOrig++;
      vamp = vamp.creator;
      // console.log(vamp);
    }
    return numFromOrig;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    } else {
      return false;
    }
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let minor;
    let senior;
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      minor = vampire;
      senior = this;
    } else {
      minor = this;
      senior = vampire;
    }

    while (minor.numberOfVampiresFromOriginal !== senior.numberOfVampiresFromOriginal) {
      minor = minor.creator;
    }
    while (minor.name !== senior.name) {
      minor = minor.creator;
      senior = senior.creator;
    }
    return minor;
  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.offspring.length > 0) {
      for (const offspring of this.offspring) {
        if (offspring.vampireWithName(name)) {
          return offspring.vampireWithName(name);
        }
      }
    } else {
      if ((this.name = name)) {
        return this;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let numDecendents = 0;
    if (this.offspring.length > 0) {
      for (const vamp of this.offspring) {
        numDecendents += vamp.totalDescendents;
      }
      numDecendents += this.offspring.length;
    }
    return numDecendents;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let output = [];
    if (this.offspring.length > 0) {
      for (const offspring of this.offspring) {
        // console.log(offspring.allMillennialVampires);
        // console.log(output);
        output = output.concat(offspring.allMillennialVampires);
      }
    }
    if (this.yearConverted > 1980) {
      // console.log(`mellenial == ${this.yearConverted}`);
      output.push(this);
    }

    return output;
  }
}

module.exports = Vampire;
