info=$1
if ["$info" = ""];
then info="feat:blog initialized"
fi
git add -A
git commit -m "$info"
git push origin main