# Conllu
Conllu Editor is a tool capable of manipulating files in CoNLL-U format, including the creation and manipulation of multi-word tokens in a sentence. It is written in JavaScript.

#Conllu object
The Conllu object is the highest level object, and allows manipulation at the full file level. This involves getting information from an existing conllu file, splitting and merging sentences, ensuring consistent sentence id, and exporting into conllu format.
#Sentence object
The Sentence object represents a sentence in the conllu file. It contains internally consistent token id numbering, starting with 1 for the first word. Comments which often initiate the sentence (see conllu documentation) are also contained within this object. It is possible to change, split, merge, add or delete such comments.
#Token object
The Token object is representative of the individual word. It is possible to split a token into separate parts, for example to rectify tokenization errors. It is also possible to merge tokens into a single token object.
#MultiwordToken object
The MultiwordToken object is specific to tokens composed of multiple semantic parts. It is composed of a parent, which is the full word found in the text; and of children, which are the semantically independent sub-parts. The id of a multi-word token is simply the range of its children's ids. Children id's follow from the preceding tokens in the sentence.
